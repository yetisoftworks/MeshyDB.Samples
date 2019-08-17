using MeshyDB.SDK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace MeshyForums.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ProfilePage : ContentPage
    {
        public CurrentUser User { get; set; }

        public ProfilePage()
        {
            InitializeComponent();

            User = App.Connection.CurrentUser;

            BindingContext = this;
        }

        async void Update_Clicked(object sender, EventArgs e)
        {
            var updateUser = await App.Connection.Users.GetSelfAsync();
            updateUser.FirstName = User.FirstName;
            updateUser.LastName = User.LastName;

            await App.Connection.Users.UpdateSelfAsync(updateUser);
        }
    }
}