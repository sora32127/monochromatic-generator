import type { MetaFunction } from "@remix-run/node";
import type { AppType } from "../../../backend/src/index";
import { hc } from "hono/client";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const client = hc<AppType>('http://localhost:8787');

export async function loader() {
  const res = await client.api.users.$post({
    json: {
      name: "John Doe",
      age: 30,
    },
  });
  return res.json();
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      {data.message}
    </div>
  );
}