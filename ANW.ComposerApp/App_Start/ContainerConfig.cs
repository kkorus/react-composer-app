using System.Reflection;
using System.Web.Http;
using ANW.ComposerApp.Services;
using Autofac;
using Autofac.Integration.WebApi;

namespace ANW.ComposerApp.App_Start
{
    public class ContainerConfig
    {
        public static void RegisterDependencies()
        {
            var builder = new ContainerBuilder();

            builder.RegisterType<ComposerService>().As<IComposerService>();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            var container = builder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}