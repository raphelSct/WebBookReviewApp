import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Authors } from "./routes/authors";
import { Books } from "./routes/books";
import { AuthorDetails } from "./routes/author";
import { BookDetails } from "./routes/book";

import Root from "./routes/root"

//Importer le index.css
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Root />
      </div>
    ),
    children: [
      {
        index: true,
        element: (
          <div>
            <h1>Welcome</h1>
          </div>
        ),
      },
      {
        path: "about",
        element: <div>About</div>,
      },
      {
        path:"/authors",
        element:(
          <div>
            <Authors />
          </div>
        ),
        children: [
          {
            index: true,
            element: (
            <div>
              <p>Vous avez la possibilité de choisir un auteur dans la liste</p>
            </div>),
          },
          {
            path:":author_id",
            element: (
              <div>
                <AuthorDetails />
              </div>
            )
          }
        ]
      },
      {
        path:"/books",
        element:(
          <div>
            <Books />
          </div>
        ),
        children:[
          {
            index: true,
            element:(
              <div>
                <p>Vous avez la possibilité de choisir un livre dans la liste</p>
              </div>
            )
          },
          {
            path:":book_id",
            element:(
              <div>
                <BookDetails />
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: (
      <div>
        <Navigate to="/" />
      </div>
    )
  }
])!;

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);