import Link from "next/link";
import Image from 'next/image'
import connectMongo from "../utils/connectMongo";
import Users from "../models/Users";

const User = ({ users }) => (
  <div className="bg-white">
    <div className="mx-auto max-w-2xl  px-4 sm:py-24 sm:px-6 lg:max-w-4xl lg:px-8">
      <h2 className="sr-only">Users</h2>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {users.map((user) => (
          <a key={user.id} href="#" className="group">
            <div className="aspect-w-1 aspect-h-1 w-1/2 overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8">
              <Image src={user.image} alt='USER' className="h-1/2 object-cover object-center group-hover:opacity-75" width={500} height={500}></Image>
            </div>
            <h3 className="mt-4 text-lg text-gray-700">{user.username}</h3>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {user.email}
            </div>
            <br />
          </a>
        ))}
      </div>
    </div>
  </div>
);
/* Retrieves product(s) data from mongodb database */
export async function getStaticProps() {
  await connectMongo();

  /* find all the data in our database */
  const result = await Users.find({});
  const users = result.map((doc) => {
    const user = doc.toObject();
    user._id = user._id.toString();
    return user;
  });

  return { props: { users: users } };
}

export default User;
