using System;
using System.Collections.Generic;
using System.ComponentModel;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

using MeshyForums.Models;
using MeshyForums.ViewModels;

namespace MeshyForums.Views
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class EditItemPage : ContentPage
    {
        ItemDetailViewModel viewModel;

        public EditItemPage()
        {
            InitializeComponent();

            var item = new Item();
            viewModel = new ItemDetailViewModel(item);
            BindingContext = viewModel;
        }

        public EditItemPage(ItemDetailViewModel item)
        {
            InitializeComponent();

            BindingContext = viewModel = item;
        }

        async void Update_Clicked(object sender, EventArgs e)
        {
            MessagingCenter.Send(this, "UpdateItem", viewModel.Item);
            await Navigation.PopModalAsync();
        }

        async void Cancel_Clicked(object sender, EventArgs e)
        {
            await Navigation.PopModalAsync();
        }
    }
}