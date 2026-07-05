import { Funnel, Library, Plus, SquarePen, Trash2 } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import getAttributes from "~/api/getAttributes";
import { useLoaderData, useSearchParams } from "react-router";
import { AttributeTypeC } from "~/components/AttributeTypeC";
import {
  AttributeCategory,
  AttributeType,
  type Attribute,
} from "~/types/Attribute";
import AttributeCategoryC from "~/components/AttributeCategoryC";
import Pagination from "~/components/Pagination";
import type { Route } from "./+types/attributes";

export async function clientLoader({ url }: Route.ClientLoaderArgs) {
  const searchParams = new URL(url).searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const attributes = await getAttributes(page);

  return attributes;
}

export default function Attributes() {
  const { attributes, total, totalPages } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  function setPage(newPage: number) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      params.set("page", newPage.toString());

      return params;
    });
  }

  return (
    <main>
      <div className="px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl text-nav-text-active tracking-[-0.4px]">
            Attribute Library
          </h1>
          <p className="text-xs text-nav-text mt-0.5">
            Create and manage reusable attributes used by Positions, Candidate
            Profiles and CVs.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-table-header border border-table-border">
            <Library className="w-3.5 h-3.5 text-nav-text" />
            <span className="font-medium text-xs text-hr">
              {total} attributes
            </span>
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold bg-nav-border-active text-white">
            <Plus className="w-3.5 h-3.5" />
            New Attribute
          </button>
        </div>
      </div>
      <div className="px-6 py-3 flex justify-between items-center gap-3 border-y border-border">
        <input
          type="text"
          placeholder="Search by name..."
          className="text-xs text-date px-3 py-2 rounded-lg bg-table-header border border-table-border min-w-[260px]"
        />
        <div className="flex items-center gap-1.5 text-xs text-date">
          <Funnel className="w-3 h-3" />
          <span>
            Showing {attributes.length} of {total}
          </span>
        </div>
      </div>
      <div className="mx-6 my-3 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#111827] dark:bg-[#6366f1]">
        <div className="flex items-center gap-2 mr-2">
          <Checkbox
            checked={true}
            className="h-5 w-5 border-[#4B5563] bg-[#374151] data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
          />
          <span className="text-xs font-semibold text-white">3 selected</span>
        </div>
        <hr className="w-px mx-1 h-5 bg-hr" />
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-date bg-hr">
          <SquarePen className="w-3.5 h-3.5" />
          <span>Edit</span>
          <span className="ml-1 px-1.5 py-0.5 rounded text-xs bg-[#1f2937] dark:bg-indigo-300 text-nav-text text-[10px]">
            1 only
          </span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#dc2626] text-white">
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
      <div className="mx-6 mt-2 rounded-xl overflow-hidden border border-table-border">
        <table className="w-full">
          <thead>
            <tr className="uppercase bg-table-header border-b text-xs font-semibold tracking-[0.06em] text-nav-text text-left">
              <th className="px-4 py-2.5 w-[3%]">
                <Checkbox className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
              </th>
              <th className="px-2 py-2.5 w-[32%]">Name</th>
              <th className="px-4 py-2.5 w-[17%]">Category</th>
              <th className="px-4 py-2.5 w-[12%]">Type</th>
              <th className="px-4 py-2.5 w-[24%]">Description</th>
              <th className="px-4 py-2.5 w-[12%]">Created</th>
            </tr>
          </thead>
          <tbody>
            {attributes.map((attribute: Attribute) => (
              <tr className="text-xs" key={attribute.id}>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Checkbox className="h-4 w-4 border-[#4B5563] bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
                  </div>
                </td>
                <td className="px-2 py-2.5 font-medium text-sm text-nav-text-active">
                  {attribute.name}
                </td>
                <td className="px-4 py-2.5 truncate text-nav-text">
                  <AttributeCategoryC category={attribute.category} />
                </td>
                <td className="px-4 py-2.5">
                  <AttributeTypeC type={attribute.type} />
                </td>
                <td className="px-4 py-2.5">{attribute.description}</td>
                <td className="px-4 py-2.5">{attribute.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
