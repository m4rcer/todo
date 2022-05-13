using System;
using System.ComponentModel.DataAnnotations;

namespace TodoApi1.Models
{
    public enum TodoSteps
    {
        Uncomplete,
        InProgress,
        Complete
    }
    public enum Categories
    {
        NoCategory,
        Home,
        Work,
        Entertaiment
    }
    public class TodoItem
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public TodoSteps TodoStep { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public Categories Category { get; set; }
        public int OrderId { get; set; }
    }
}