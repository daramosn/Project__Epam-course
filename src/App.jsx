import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Courses from "./components/Courses/Courses";
import CourseForm from "./components/CourseForm/CourseForm";
import CourseInfo from "./components/CourseInfo/CourseInfo";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CourseUpdate from "./components/CourseUpdate/CourseUpdate";

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" /> },
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "login", element: <Login /> },
            { path: "registration", element: <Registration /> },

            {
                path: "courses",
                children: [
                    { index: true, element: <Courses /> },
                    {
                        path: "add",
                        element: <PrivateRoute redirectPath={"/courses"} />,
                        children: [{ index: true, element: <CourseForm /> }],
                    },
                    { path: ":courseId", element: <CourseInfo /> },
                    {
                        path: "update/:courseId",
                        element: <PrivateRoute redirectPath={"/courses"} />,
                        children: [{ index: true, element: <CourseUpdate /> }],
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
