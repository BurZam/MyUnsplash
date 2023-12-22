using Microsoft.AspNetCore.Mvc;
using MyUnsplash.Server.Context;
using MyUnsplash.Server.Models;

namespace MyUnsplash.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnsplashController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ILogger<UnsplashController> _logger;
        private readonly UnsplashContext _context;
        private readonly IConfiguration _configuration;

        public UnsplashController(IWebHostEnvironment webHostEnvironment, ILogger<UnsplashController> logger, IConfiguration configuracion, UnsplashContext context)
        {
            this._logger = logger;
            this._webHostEnvironment = webHostEnvironment;
            this._context = context;
            this._configuration = configuracion;
        }

        [HttpGet]
        [Route("Get")]
        public IActionResult Get(string? label)
        {
            try
            {
                if (label == null)
                {
                    var data = this._context.Images.ToList();
                    return Ok(data);

                }
                else
                {
                    var result = this._context.Images.Where(images => images.Label.ToLower().Contains(label.ToLower()));
                    return result == null ? Ok(new List<Unsplash>()) : Ok(result);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("New")]
        public IActionResult CreateImage(UnsplashPayload payload)
        {
            try
            {
                var unsplash = new Unsplash { Label = payload.Label, URL = payload.URL };

                this._context.Images.Add(unsplash);
                this._context.SaveChanges();

                return Ok();
            }

            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete]
        [Route("Delete")]
        public IActionResult Delete(string label, string password)
        {
            try
            {
                var deletePassword = this._configuration["deletePassword"];
                if (deletePassword == password)
                {
                    var unsplash = this._context.Images.Single(images => images.Label == label);
                    this._context.Remove(unsplash);
                    this._context.SaveChanges();

                    return Ok();
                }

                return BadRequest("Incorrect Password");

            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
    }
}
