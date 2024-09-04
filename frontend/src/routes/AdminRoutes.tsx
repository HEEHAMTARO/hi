import { lazy } from "react";

import { RouteObject } from "react-router-dom";

import Loadable from "../components/third-patry/Loadable";

import FullLayout from "../layout/FullLayout";


const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));

const Dashboard = Loadable(lazy(() => import("../pages/dashboard")));

const Try = Loadable(lazy(() => import("../pages/Try")));

const Postwork = Loadable(lazy(() => import("../pages/postwork")));

const Post = Loadable(lazy(() => import("../pages/Post")));

const Customer = Loadable(lazy(() => import("../pages/customer")));

const CreateCustomer = Loadable(lazy(() => import("../pages/customer/create")));

const EditCustomer = Loadable(lazy(() => import("../pages/customer/edit")));

const EditWork = Loadable(lazy(() => import("../pages/Post/edit")));

const CreateWork = Loadable(lazy(() => import("../pages/Post/create")));


const AdminRoutes = (isLoggedIn : boolean): RouteObject => {

  return {

    path: "/",

    element: isLoggedIn ? <FullLayout /> : <MainPages />,

    children: [

      {

        path: "/",

        element: <Dashboard />,

      },

      {

        path: "/t",

        element: <Try />,

      },

      {

        path: "/go",

        element: <Postwork />,

      },

      /*{

        path: "/p",

        element: <Post />,

      },*/
      

      {

        path: "/customer",

        children: [

          {

            path: "/customer",

            element: <Customer />,

          },

          {

            path: "/customer/create",

            element: <CreateCustomer />,

          },

          {

            path: "/customer/edit/:id",

            element: <EditCustomer />,

          },

        ],

      },

      {

        path: "/work",

        children: [

          {

            path: "/work",

            element: <Post />,

          },

          {

            path: "/work/create",

            element: <CreateWork />,

          },

          {

            path: "/work/edit/:id",

            element: <EditWork />,

          },

        ],

      },


    ],

  };

};


export default AdminRoutes;