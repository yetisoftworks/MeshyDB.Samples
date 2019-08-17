using System;
using System.Collections.Generic;
using System.Text;

namespace MeshyForums.Models
{
    public enum MenuItemType
    {
        Browse,
        About,
        Profile
    }
    public class HomeMenuItem
    {
        public MenuItemType Id { get; set; }

        public string Title { get; set; }
    }
}
