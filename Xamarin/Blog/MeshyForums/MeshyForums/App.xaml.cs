using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using MeshyForums.Services;
using MeshyForums.Views;
using MeshyDB.SDK;
using Xamarin.Essentials;
using System.Threading.Tasks;

namespace MeshyForums
{
    public partial class App : Application
    {
        public static IMeshyClient client;
        public static IMeshyClient Client
        {
            get
            {
                if (client == null)
                {
                    var accountName = "<INSERT ACCOUNT NAME HERE>";
                    var publicKey = "<INSERT PUBLIC KEY HERE>";

                    client = MeshyClient.Initialize(accountName, publicKey);
                }
                return client;
            }
        }

        public static IMeshyConnection connection;
        public static IMeshyConnection Connection
        {
            get
            {
                if (connection == null)
                {
                    connection = Client.LoginAnonymously(DeviceId.ToString());
                }
                return connection;
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

        private void RegisterDeviceUser()
        {
            var userExists = Client.CheckUserExist(DeviceId.ToString());
            if (!userExists.Exists)
            {
                Client.RegisterAnonymousUser(DeviceId.ToString());
            }
        }

        public App()
        {
            InitializeComponent();

            InitializeMeshy();

            MainPage = new MainPage();
        }

        private void InitializeMeshy()
        {
            RegisterDeviceUser();
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
