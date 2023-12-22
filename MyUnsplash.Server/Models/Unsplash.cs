using System.ComponentModel.DataAnnotations.Schema;

namespace MyUnsplash.Server.Models
{
    [Table("Images")]
    public class Unsplash
    {
        public int Id { get; set; }

        public string Label { get; set; }

        public string URL { get; set; }
    }
}
