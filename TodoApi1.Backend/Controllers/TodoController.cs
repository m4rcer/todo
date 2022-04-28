using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using TodoApi1.Data;
using TodoApi1.Models;

namespace TodoApi1.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodoController(TodoDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets the list of todo
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// GET /todo
        /// </remarks>
        /// <returns>Returns IEnumerable(TodoItem)</returns>
        /// <response code="200">Success</response> 
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetAll()
        {
            return Ok(_context.TodoItems);
        }

        /// <summary>
        /// Gets the todo by step
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// GET /todo/0
        /// </remarks>
        /// <param name="step">Step of todos</param>
        /// <returns>Returns IEnumerable(TodoItem)</returns>
        /// <response code="200">Success</response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [HttpGet("{step}")]
        public ActionResult<IEnumerable<TodoItem>> GetByStep(int step)
        {
            var items = _context.TodoItems.Where(item => (int)item.TodoStep == step).ToList();
            if (items == null)
                return NotFound();
            return Ok(items);
        }

        /// <summary>
        /// Creates the todo
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// POST /todo
        /// {
        ///     name: "todo name",
        ///     todoStep: 0
        /// }
        /// </remarks>
        /// <param name="item">TodoItem object</param>
        /// <returns>Returns id (int)</returns>
        /// <response code="201">Success</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult Create([FromBody] TodoItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            item.OrderId = item.Id;
            _context.TodoItems.Add(item);
            _context.SaveChanges();
            return Ok(item.Id);
        }

        /// <summary>
        /// Updates the todo
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// PUT /todo
        /// {
        ///     name: "updated name",
        ///     todoStep: 0,
        ///     orderId: 1
        /// }
        /// </remarks>
        /// <param name="item">TodoItem object</param>
        /// <returns>Returns NoContent</returns>
        /// <response code="204">Success</response>
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult Update([FromBody] TodoItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var todo = _context.TodoItems
                .Where(i => i.OrderId == item.OrderId)
                .FirstOrDefault();

            if (todo == null)
            {
                return NotFound();
            }

            todo.Name = item.Name;
            todo.TodoStep = item.TodoStep;

            _context.SaveChanges();
            return new NoContentResult();
        }

        /// <summary>
        /// Deletes the todo by id
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// DELETE /note/1
        /// </remarks>
        /// <param name="id">Id of the todo (int)</param>
        /// <returns>Returns NoContent</returns>
        /// <response code="204">Success</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult Delete(int id)
        {
            var todo = _context.TodoItems.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todo);
            _context.SaveChanges();

            return new NoContentResult();
        }

        /// <summary>
        /// Deletes the todos by step
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// DELETE /note/many/0
        /// </remarks>
        /// <param name="step">Step of the todos (TodoSteps | int)</param>
        /// <returns>Returns NoContent</returns>
        /// <response code="204">Success</response>
        [HttpDelete("many/{step}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public IActionResult DeleteMany(int step)
        {
            var todo = _context.TodoItems.Where(i => (int)i.TodoStep == step);
            if (todo == null)
            {
                return NotFound();
            }

            _context.TodoItems.RemoveRange(todo);

            _context.SaveChanges();
            return new NoContentResult();
        }

        /// <summary>
        /// Creates the todos
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// PUT /note/many
        /// { [
        ///     {
        ///     name: "todo name",
        ///     todoStep: 0,
        ///     orderId: 1
        ///     },
        ///     {
        ///     name: "todo name2",
        ///     todoStep: 0,
        ///     orderId: 2
        ///     }
        /// ] }
        /// </remarks>
        /// <returns>Returns NoContent</returns>
        /// <response code="204">Success</response>
        [HttpPost("many")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult CreateMany([FromBody] TodoItem[] items)
        {
            foreach (var item in items)
            {
                if (item == null)
                {
                    return BadRequest();
                }
                _context.TodoItems.Add(item);
            }
            _context.SaveChanges();
            return Ok();
        }
    }
}
