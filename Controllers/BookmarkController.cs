using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using GithubRepository.Models;

namespace GithubRepository.Controllers
{
    public class BookmarkController : ApiController
    {
        const string BOOKMARKS_KEY = "bookmarks";

        public BookmarkController()
        {
            if (HttpContext.Current.Session[BOOKMARKS_KEY] == null)
            {
                HttpContext.Current.Session[BOOKMARKS_KEY] = new Dictionary<string, Repository>();
            }
        }

        // GET api/<controller>
        public Dictionary<string, Repository> Get()
        {
            return HttpContext.Current.Session[BOOKMARKS_KEY] as Dictionary<string, Repository>;
        }

        // POST api/<controller>
        public void Post([FromBody]Repository repository)
        {
            var bookmarks = HttpContext.Current.Session[BOOKMARKS_KEY] as Dictionary<string, Repository>;
            if(!bookmarks.ContainsKey(repository.id))
            {
                bookmarks.Add(repository.id, repository);
            }
            HttpContext.Current.Session[BOOKMARKS_KEY] = bookmarks;
        }

        // DELETE api/<controller>/5
        public void Delete(string id)
        {
            var bookmarks = HttpContext.Current.Session[BOOKMARKS_KEY] as Dictionary<string, Repository>;
            if (bookmarks.ContainsKey(id))
            {
                bookmarks.Remove(id);
            }
            HttpContext.Current.Session[BOOKMARKS_KEY] = bookmarks;
        }
    }
}