namespace ANW.ComposerApp.Models
{
    public class Composer
    {
        public virtual int Id { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual string Title { get; set; }
        public virtual string Awards { get; set; }
    }
}