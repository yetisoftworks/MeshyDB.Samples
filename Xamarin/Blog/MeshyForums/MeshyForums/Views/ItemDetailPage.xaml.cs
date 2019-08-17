using System;
using System.ComponentModel;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

using MeshyForums.Models;
using MeshyForums.ViewModels;
using System.Threading.Tasks;

namespace MeshyForums.Views
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class ItemDetailPage : ContentPage
    {
        ItemDetailViewModel viewModel;

        public ItemDetailPage(ItemDetailViewModel viewModel)
        {
            InitializeComponent();

            BindingContext = this.viewModel = viewModel;

            InitializeToolbarItems();
            InitializeMessagingSubscription();

        }

        private void InitializeMessagingSubscription()
        {
            MessagingCenter.Subscribe<EditItemPage, Item>(this, "UpdateItem", (obj, item) =>
            {
                if (item.Id == this.viewModel.Item.Id)
                {
                    BindingContext = viewModel = new ItemDetailViewModel(item);
                }
            });
        }

        private void InitializeToolbarItems()
        {
            if (viewModel.Item.CreatedById == App.Connection.CurrentUser.Id)
            {
                ToolbarItems.Add(new ToolbarItem("Edit", null, new Action(async () => await EditItem())));
                ToolbarItems.Add(new ToolbarItem("Delete", null, new Action(async () => await DeleteItem())));
            }
        }

        private async Task EditItem()
        {
            var editPage = new NavigationPage(new EditItemPage(viewModel));
            await Navigation.PushModalAsync(editPage);
        }

        private async Task DeleteItem()
        {
            var confirm = await DisplayAlert("Delte This Item?", "Are you sure you want to delete this item?", "YES", "NO");
            if (confirm)
            {
                MessagingCenter.Send(this, "DeleteItem", viewModel.Item);
                await Navigation.PopAsync();
            }
        }

        public ItemDetailPage()
        {
            InitializeComponent();

            var item = new Item();

            viewModel = new ItemDetailViewModel(item);
            BindingContext = viewModel;
        }
    }
}