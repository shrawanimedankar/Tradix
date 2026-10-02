import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container mx-auto mb-12 px-5 py-12">
      <div className="text-center">
        <img
          src="/media/images/notFound.png"
          alt="404 Not Found"
          className="mx-auto w-54"
        />
        <h1 className="mt-2 text-2xl font-bold text-gray-900">NOT FOUND</h1>
        <p className="mb-5 mt-0 text-gray-800">
          Sorry, the page you are trying to access has been moved or no longer
          exists.
        </p>

        <Link to="/" className="mt-5 w-fit custom-button">
          Home Page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
