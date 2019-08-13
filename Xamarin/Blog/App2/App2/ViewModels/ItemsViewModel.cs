using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Threading.Tasks;

using Xamarin.Forms;

using App2.Models;
using App2.Views;
using System.Linq.Expressions;
using System.Linq;
using System.Collections.Generic;
using MeshyDB.SDK.Enums;
using System.Collections.Specialized;

namespace App2.ViewModels
{
    public class ItemsViewModel : BaseViewModel
    {
        public ObservableCollection<Item> Items { get; set; }
        public Command LoadItemsCommand { get; set; }
        public Command LoadMoreItemsCommand { get; set; }

        public ItemsViewModel()
        {
            Title = "Recent Posts";
            Items = new ObservableCollection<Item>();
            LoadItemsCommand = new Command(async () => await ExecuteLoadItemsCommand());
            LoadMoreItemsCommand = new Command(async () => await ExecuteLoadMoreItemsCommand());

            MessagingCenter.Subscribe<NewItemPage, Item>(this, "AddItem", async (obj, item) =>
            {
                var newItem = item as Item;
                newItem.CreatedById = App.Connection.CurrentUser.Id;
                newItem.DateCreated = DateTimeOffset.Now;

                var username = App.Connection.CurrentUser.Username;
                var name = $"{App.Connection.CurrentUser.FirstName} {App.Connection.CurrentUser.LastName}".Trim();
                username = !string.IsNullOrWhiteSpace(name) ? name : username;
                newItem.CreatedByName = username;

                try
                {
                    await App.Connection.Meshes.CreateAsync<Item>(newItem);
                    Items.Insert(0, newItem);
                }
                catch (Exception)
                {
                    throw;
                }
            });

            MessagingCenter.Subscribe<ItemDetailPage, Item>(this, "DeleteItem", async (obj, item) =>
            {
                try
                {
                    await App.Connection.Meshes.DeleteAsync<Item>(item.Id);
                    Items.Remove(item);
                }
                catch (Exception)
                {

                    throw;
                }
            });

            MessagingCenter.Subscribe<EditItemPage, Item>(this, "UpdateItem", async (obj, item) =>
            {
                var username = App.Connection.CurrentUser.Username;
                var name = $"{App.Connection.CurrentUser.FirstName} {App.Connection.CurrentUser.LastName}".Trim();
                username = !string.IsNullOrWhiteSpace(name) ? name : username;
                item.CreatedByName = username;

                try
                {
                    await App.Connection.Meshes.UpdateAsync<Item>(item.Id, item);

                    var post = Items.FirstOrDefault(x => x.Id == item.Id);
                    post = item;
                }
                catch (Exception)
                {

                    throw;
                }
            });
        }

        async Task ExecuteLoadMoreItemsCommand()
        {
            if (IsBusy)
                return;

            try
            {
                var lastItem = Items[Items.Count - 1];

                // todo: filtering by this isn't working
                Expression<Func<Item, bool>> filter = (Item x) => x.DateCreated < lastItem.DateCreated;
                //Expression<Func<Item, bool>> filter = (Item x) => true;

                var sort = new List<KeyValuePair<string, SortDirection>>();
                sort.Add(new KeyValuePair<string, SortDirection>(nameof(Item.DateCreated), SortDirection.Descending));

                var items = await App.Connection.Meshes.SearchAsync(filter, sort, 1, 10);
                if (items.TotalRecords > 0)
                {
                    foreach (var item in items.Results)
                    {
                        Items.Add(item);
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }


        async Task ExecuteLoadItemsCommand()
        {
            if (IsBusy)
                return;

            IsBusy = true;

            try
            {
                Items.Clear();
                Expression<Func<Item, bool>> filter = (Item x) => true;

                var sort = new List<KeyValuePair<string, SortDirection>>();
                sort.Add(new KeyValuePair<string, SortDirection>(nameof(Item.DateCreated), SortDirection.Descending));

                var items = await App.Connection.Meshes.SearchAsync(filter, sort, 1, 10);
                if (items.TotalRecords > 0)
                {
                    foreach (var item in items.Results)
                    {
                        Items.Add(item);
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }
            finally
            {
                IsBusy = false;
            }
        }
    }
}