using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using App2.Services;
using App2.Views;
using MeshyDB.SDK;
using Xamarin.Essentials;
using System.Threading.Tasks;

namespace App2
{
    public partial class App : Application
    {
        static IMeshyClient client;
        public static IMeshyClient Client
        {
            get
            {
                if (client == null)
                {
                    var accountName = "gails";
                    var publicKey = "6d7518affff94db88b42614b9c7778d6";

                    client = MeshyClient.Initialize(accountName, publicKey);
                }
                return client;
            }
        }

        public static Guid DeviceId
        {
            get
            {
                var id = Preferences.Get("device_id", string.Empty);
                if (string.IsNullOrWhiteSpace(id))
                {
                    id = System.Guid.NewGuid().ToString();
                    Preferences.Set("device_id", id);
                }
                return new Guid(id);
            }
        }

        private async Task RegisterDeviceUser()
        {
            var userExists = await Client.CheckUserExistAsync(DeviceId.ToString());
            if (!userExists.Exists)
            {
                await Client.RegisterAnonymousUserAsync(DeviceId.ToString());
            }
        }

        public static IMeshyConnection Connection;
        public async Task<IMeshyConnection> EstablishConnection()
        {
            if (Connection == null)
            {
                Connection = await Client.LoginAnonymouslyAsync(DeviceId.ToString());
            }
            return Connection;
        }

        public App()
        {
            InitializeComponent();

            InitializeMeshy();

            MainPage = new MainPage();
        }

        private void InitializeMeshy()
        {
            Task.Run(async () => await RegisterDeviceUser()).Wait();
            Task.Run(async () => await EstablishConnection()).Wait();
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
