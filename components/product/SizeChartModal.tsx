"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SizeChartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productSlug?: string;
}

// Size chart data from WhatsApp images (in inches)
// Item codes mapped to product slugs with numeric sizes
const productSizeCharts: Record<
  string,
  {
    title: string;
    itemCode: string;
    sizes: {
      size: string;
      length: string;
      chest: string;
      sleeve: string;
      shoulder: string;
    }[];
  }
> = {
  // Item B5213 (Boy) - UIM Brand (Batch 5) - Sizes 18-19-20-21
  "batch5-jacket-black": {
    title: "UIM Winter Jacket Size Chart",
    itemCode: "B5213",
    sizes: [
      { size: "18", length: "22", chest: "16", sleeve: "18", shoulder: "14" },
      { size: "19", length: "22", chest: "17", sleeve: "18", shoulder: "14.5" },
      { size: "20", length: "24", chest: "18", sleeve: "19", shoulder: "15" },
      { size: "21", length: "25", chest: "19", sleeve: "20", shoulder: "16" },
    ],
  },
  "batch5-jacket-navy": {
    title: "UIM Winter Jacket Size Chart",
    itemCode: "B5213",
    sizes: [
      { size: "18", length: "22", chest: "16", sleeve: "18", shoulder: "14" },
      { size: "19", length: "22", chest: "17", sleeve: "18", shoulder: "14.5" },
      { size: "20", length: "24", chest: "18", sleeve: "19", shoulder: "15" },
      { size: "21", length: "25", chest: "19", sleeve: "20", shoulder: "16" },
    ],
  },
  "batch5-jacket-olive": {
    title: "UIM Winter Jacket Size Chart",
    itemCode: "B5213",
    sizes: [
      { size: "18", length: "22", chest: "16", sleeve: "18", shoulder: "14" },
      { size: "19", length: "22", chest: "17", sleeve: "18", shoulder: "14.5" },
      { size: "20", length: "24", chest: "18", sleeve: "19", shoulder: "15" },
      { size: "21", length: "25", chest: "19", sleeve: "20", shoulder: "16" },
    ],
  },
  "batch5-jacket-grey": {
    title: "UIM Winter Jacket Size Chart",
    itemCode: "B5213",
    sizes: [
      { size: "18", length: "22", chest: "16", sleeve: "18", shoulder: "14" },
      { size: "19", length: "22", chest: "17", sleeve: "18", shoulder: "14.5" },
      { size: "20", length: "24", chest: "18", sleeve: "19", shoulder: "15" },
      { size: "21", length: "25", chest: "19", sleeve: "20", shoulder: "16" },
    ],
  },

  // Item A5024 (Girl) - Classic Collection - Sizes 13-14-15
  "classic-jacket-black": {
    title: "Classic Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "16", chest: "13", sleeve: "13", shoulder: "12" },
      { size: "14", length: "18", chest: "14", sleeve: "14", shoulder: "12.5" },
      { size: "15", length: "20", chest: "15", sleeve: "15.5", shoulder: "13" },
    ],
  },
  "classic-jacket-grey": {
    title: "Classic Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "16", chest: "13", sleeve: "13", shoulder: "12" },
      { size: "14", length: "18", chest: "14", sleeve: "14", shoulder: "12.5" },
      { size: "15", length: "20", chest: "15", sleeve: "15.5", shoulder: "13" },
    ],
  },
  "classic-jacket-brown": {
    title: "Classic Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "16", chest: "13", sleeve: "13", shoulder: "12" },
      { size: "14", length: "18", chest: "14", sleeve: "14", shoulder: "12.5" },
      { size: "15", length: "20", chest: "15", sleeve: "15.5", shoulder: "13" },
    ],
  },
  "classic-jacket-red": {
    title: "Classic Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "16", chest: "13", sleeve: "13", shoulder: "12" },
      { size: "14", length: "18", chest: "14", sleeve: "14", shoulder: "12.5" },
      { size: "15", length: "20", chest: "15", sleeve: "15.5", shoulder: "13" },
    ],
  },
  "classic-jacket-beige-pink": {
    title: "Classic Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "16", chest: "13", sleeve: "13", shoulder: "12" },
      { size: "14", length: "18", chest: "14", sleeve: "14", shoulder: "12.5" },
      { size: "15", length: "20", chest: "15", sleeve: "15.5", shoulder: "13" },
    ],
  },
  "classic-jacket-pink": {
    title: "Classic Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "16", chest: "13", sleeve: "13", shoulder: "12" },
      { size: "14", length: "18", chest: "14", sleeve: "14", shoulder: "12.5" },
      { size: "15", length: "20", chest: "15", sleeve: "15.5", shoulder: "13" },
    ],
  },

  // Item A5194 (Girl) - Batch 3 (Deluxe) - Sizes 13-14-15
  "batch3-jacket-beige": {
    title: "Deluxe Winter Jacket Size Chart",
    itemCode: "A5194",
    sizes: [
      { size: "13", length: "15", chest: "12", sleeve: "12", shoulder: "11" },
      {
        size: "14",
        length: "17",
        chest: "13",
        sleeve: "13.5",
        shoulder: "11.5",
      },
      { size: "15", length: "18", chest: "13", sleeve: "13.5", shoulder: "11" },
    ],
  },
  "batch3-jacket-black": {
    title: "Deluxe Winter Jacket Size Chart",
    itemCode: "A5194",
    sizes: [
      { size: "13", length: "15", chest: "12", sleeve: "12", shoulder: "11" },
      {
        size: "14",
        length: "17",
        chest: "13",
        sleeve: "13.5",
        shoulder: "11.5",
      },
      { size: "15", length: "18", chest: "13", sleeve: "13.5", shoulder: "11" },
    ],
  },
  "batch3-jacket-green": {
    title: "Deluxe Winter Jacket Size Chart",
    itemCode: "A5194",
    sizes: [
      { size: "13", length: "15", chest: "12", sleeve: "12", shoulder: "11" },
      {
        size: "14",
        length: "17",
        chest: "13",
        sleeve: "13.5",
        shoulder: "11.5",
      },
      { size: "15", length: "18", chest: "13", sleeve: "13.5", shoulder: "11" },
    ],
  },
  "batch3-jacket-peach": {
    title: "Deluxe Winter Jacket Size Chart",
    itemCode: "A5194",
    sizes: [
      { size: "13", length: "15", chest: "12", sleeve: "12", shoulder: "11" },
      {
        size: "14",
        length: "17",
        chest: "13",
        sleeve: "13.5",
        shoulder: "11.5",
      },
      { size: "15", length: "18", chest: "13", sleeve: "13.5", shoulder: "11" },
    ],
  },
  "batch3-jacket-pink": {
    title: "Deluxe Winter Jacket Size Chart",
    itemCode: "A5194",
    sizes: [
      { size: "13", length: "15", chest: "12", sleeve: "12", shoulder: "11" },
      {
        size: "14",
        length: "17",
        chest: "13",
        sleeve: "13.5",
        shoulder: "11.5",
      },
      { size: "15", length: "18", chest: "13", sleeve: "13.5", shoulder: "11" },
    ],
  },
  "batch3-jacket-red": {
    title: "Deluxe Winter Jacket Size Chart",
    itemCode: "A5194",
    sizes: [
      { size: "13", length: "15", chest: "12", sleeve: "12", shoulder: "11" },
      {
        size: "14",
        length: "17",
        chest: "13",
        sleeve: "13.5",
        shoulder: "11.5",
      },
      { size: "15", length: "18", chest: "13", sleeve: "13.5", shoulder: "11" },
    ],
  },

  // Item A5047/A5286 (Girl) - Batch 2 (Premium) - Sizes 14-15-16-17
  "batch2-jacket-beige": {
    title: "Premium Winter Jacket Size Chart",
    itemCode: "A5047/A5286",
    sizes: [
      { size: "14", length: "17", chest: "12", sleeve: "12", shoulder: "10.5" },
      { size: "15", length: "19", chest: "13", sleeve: "14", shoulder: "11" },
      {
        size: "16",
        length: "20",
        chest: "13.5",
        sleeve: "14.5",
        shoulder: "12",
      },
      { size: "17", length: "21", chest: "14", sleeve: "15", shoulder: "13" },
    ],
  },
  "batch2-jacket-black": {
    title: "Premium Winter Jacket Size Chart",
    itemCode: "A5047/A5286",
    sizes: [
      { size: "14", length: "17", chest: "12", sleeve: "12", shoulder: "10.5" },
      { size: "15", length: "19", chest: "13", sleeve: "14", shoulder: "11" },
      {
        size: "16",
        length: "20",
        chest: "13.5",
        sleeve: "14.5",
        shoulder: "12",
      },
      { size: "17", length: "21", chest: "14", sleeve: "15", shoulder: "13" },
    ],
  },
  "batch2-jacket-pink": {
    title: "Premium Winter Jacket Size Chart",
    itemCode: "A5047/A5286",
    sizes: [
      { size: "14", length: "17", chest: "12", sleeve: "12", shoulder: "10.5" },
      { size: "15", length: "19", chest: "13", sleeve: "14", shoulder: "11" },
      {
        size: "16",
        length: "20",
        chest: "13.5",
        sleeve: "14.5",
        shoulder: "12",
      },
      { size: "17", length: "21", chest: "14", sleeve: "15", shoulder: "13" },
    ],
  },
  "batch2-jacket-purple": {
    title: "Premium Winter Jacket Size Chart",
    itemCode: "A5047/A5286",
    sizes: [
      { size: "14", length: "17", chest: "12", sleeve: "12", shoulder: "10.5" },
      { size: "15", length: "19", chest: "13", sleeve: "14", shoulder: "11" },
      {
        size: "16",
        length: "20",
        chest: "13.5",
        sleeve: "14.5",
        shoulder: "12",
      },
      { size: "17", length: "21", chest: "14", sleeve: "15", shoulder: "13" },
    ],
  },
  "batch2-jacket-red": {
    title: "Premium Winter Jacket Size Chart",
    itemCode: "A5047/A5286",
    sizes: [
      { size: "14", length: "17", chest: "12", sleeve: "12", shoulder: "10.5" },
      { size: "15", length: "19", chest: "13", sleeve: "14", shoulder: "11" },
      {
        size: "16",
        length: "20",
        chest: "13.5",
        sleeve: "14.5",
        shoulder: "12",
      },
      { size: "17", length: "21", chest: "14", sleeve: "15", shoulder: "13" },
    ],
  },

  // Item A5024 (Girl) - Batch 4 (Elite) - Sizes 13-14-15
  "batch4-jacket-beige": {
    title: "Elite Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "15.5", chest: "13", sleeve: "14", shoulder: "11" },
      { size: "14", length: "16", chest: "12", sleeve: "14", shoulder: "11" },
      { size: "15", length: "17", chest: "13", sleeve: "15", shoulder: "12" },
    ],
  },
  "batch4-jacket-black": {
    title: "Elite Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "15.5", chest: "13", sleeve: "14", shoulder: "11" },
      { size: "14", length: "16", chest: "12", sleeve: "14", shoulder: "11" },
      { size: "15", length: "17", chest: "13", sleeve: "15", shoulder: "12" },
    ],
  },
  "batch4-jacket-navy": {
    title: "Elite Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "15.5", chest: "13", sleeve: "14", shoulder: "11" },
      { size: "14", length: "16", chest: "12", sleeve: "14", shoulder: "11" },
      { size: "15", length: "17", chest: "13", sleeve: "15", shoulder: "12" },
    ],
  },
  "batch4-jacket-red": {
    title: "Elite Winter Jacket Size Chart",
    itemCode: "A5024",
    sizes: [
      { size: "13", length: "15.5", chest: "13", sleeve: "14", shoulder: "11" },
      { size: "14", length: "16", chest: "12", sleeve: "14", shoulder: "11" },
      { size: "15", length: "17", chest: "13", sleeve: "15", shoulder: "12" },
    ],
  },
};

// Default size chart for products not in the mapping
const defaultSizeChart = {
  title: "Winter Jacket Size Chart",
  itemCode: "General",
  sizes: [
    { size: "13", length: "16", chest: "12", sleeve: "12", shoulder: "10.5" },
    { size: "14", length: "18", chest: "13", sleeve: "14", shoulder: "11" },
    { size: "15", length: "19", chest: "14", sleeve: "15", shoulder: "12" },
  ],
};

export function SizeChartModal({
  open,
  onOpenChange,
  productSlug,
}: SizeChartModalProps) {
  // Get the size chart for the specific product, or use default
  const chart =
    productSlug && productSizeCharts[productSlug]
      ? productSizeCharts[productSlug]
      : defaultSizeChart;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {chart.title}
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Item Code: <span className="font-semibold">{chart.itemCode}</span> •
            Find the perfect fit for your little one.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {/* Size Chart Table */}
          <div className="overflow-x-auto">
            <p className="text-sm text-gray-500 mb-3 italic">
              All measurements are in inches
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-pink-50 border-b-2 border-pink-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Length
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Chest
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Sleeve
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Shoulder
                  </th>
                </tr>
              </thead>
              <tbody>
                {chart.sizes.map((row, index) => (
                  <tr
                    key={row.size}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {row.size}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{row.length}</td>
                    <td className="px-4 py-3 text-gray-700">{row.chest}</td>
                    <td className="px-4 py-3 text-gray-700">{row.sleeve}</td>
                    <td className="px-4 py-3 text-gray-700">{row.shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to Measure */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">📐 How to Measure</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                • <strong>Length:</strong> From shoulder seam to hem
              </li>
              <li>
                • <strong>Chest:</strong> Across chest, 1 inch below armhole
                (half measurement)
              </li>
              <li>
                • <strong>Sleeve:</strong> From shoulder seam to cuff
              </li>
              <li>
                • <strong>Shoulder:</strong> From shoulder seam to shoulder seam
              </li>
            </ul>
          </div>

          {/* Care Instructions */}
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">
              🧺 Care Instructions
            </h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Machine wash cold with similar colors</li>
              <li>• Tumble dry low or hang to dry</li>
              <li>• Do not bleach</li>
              <li>• Iron on low heat if needed</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
