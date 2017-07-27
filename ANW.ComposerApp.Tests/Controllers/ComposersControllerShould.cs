using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http.Results;
using ANW.ComposerApp.Controllers.Api;
using ANW.ComposerApp.Models;
using ANW.ComposerApp.Services;
using FluentAssertions;
using Moq;
using NUnit.Framework;

namespace ANW.ComposerApp.Tests.Controllers
{
    [TestFixture]
    public class ComposersControllerShould
    {
        private Mock<IComposerService> _composerService;
        private ComposersController _composersController;

        [SetUp]
        public void SetUp()
        {
            _composerService = new Mock<IComposerService>();
            _composersController = new ComposersController(_composerService.Object);
        }

        [Test]
        public async Task Return_Ok_Response_With_List_Of_Composers()
        {
            // Arrange
            IEnumerable<Composer> composers = new List<Composer>
            {
                new Composer
                {
                    Id = 1,
                    FirstName = "Foo",
                    LastName = "Bar",
                    Title = "Mr",
                    Awards = "Grammy 2017"
                }
            };

            _composerService.Setup(x => x.GetComposersAsync()).Returns(Task.FromResult(composers));

            // Act
            var result = await _composersController.GetComposers() as OkNegotiatedContentResult<IEnumerable<Composer>>;

            // Assert
            result.Content.ShouldAllBeEquivalentTo(composers);
        }

        [Test]
        public async Task Return_Ok_Response_With_Single_Composer()
        {
            // Arrange
            var composerId = 1;
            var composer = new Composer
            {
                Id = 1,
                FirstName = "Foo",
                LastName = "Bar",
                Title = "Mr",
                Awards = "Grammy 2017"
            };

            _composerService.Setup(x => x.GetComposerByIdAsync(composerId)).Returns(Task.FromResult(composer));

            // Act
            var result = await _composersController.GetComposer(composerId) as OkNegotiatedContentResult<Composer>;

            // Assert
            result.Content.ShouldBeEquivalentTo(composer);
        }

        [Test]
        public async Task Return_Not_Found_Response_For_NonExisting_Composer()
        {
            // Arrange
            var composerId = 1;
            _composerService.Setup(x => x.GetComposerByIdAsync(composerId)).Returns(Task.FromResult<Composer>(null));

            // Act
            var result = await _composersController.GetComposer(composerId) as NotFoundResult;

            // Assert
            result.Should().NotBe(null);
        }
    }
}
