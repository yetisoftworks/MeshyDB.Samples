using MeshyDB.SDK.Attributes;
using MeshyDB.SDK.Models;
using System;

namespace MeshyForums.Models
{
    [MeshName("BlogPost")]
    public class Item : MeshData
    {
        public string Text { get; set; }
        public string Description { get; set; }
        public string CreatedById { get; set; }
        public DateTimeOffset DateCreated { get; set; }
        public string CreatedByName { get; set; }
    }
}