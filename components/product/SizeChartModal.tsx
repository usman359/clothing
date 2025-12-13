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
  category?: string;
}

export function SizeChartModal({
  open,
  onOpenChange,
  category = "kids",
}: SizeChartModalProps) {
  const sizeCharts = {
    baby: {
      title: "Baby Size Chart (0-2 Years)",
      sizes: [
        { size: "0-3M", age: "0-3 months", height: "50-58cm", weight: "3-6kg" },
        { size: "3-6M", age: "3-6 months", height: "58-66cm", weight: "6-8kg" },
        {
          size: "6-12M",
          age: "6-12 months",
          height: "66-74cm",
          weight: "8-10kg",
        },
        {
          size: "12-18M",
          age: "12-18 months",
          height: "74-82cm",
          weight: "10-12kg",
        },
        {
          size: "18-24M",
          age: "18-24 months",
          height: "82-90cm",
          weight: "12-14kg",
        },
      ],
    },
    toddler: {
      title: "Toddler Size Chart (2-4 Years)",
      sizes: [
        { size: "2Y", age: "2 years", height: "86-92cm", weight: "12-14kg" },
        { size: "3Y", age: "3 years", height: "92-98cm", weight: "14-16kg" },
        { size: "4Y", age: "4 years", height: "98-104cm", weight: "16-18kg" },
      ],
    },
    kids: {
      title: "Big Kids Size Chart (4-6 Years)",
      sizes: [
        { size: "4Y", age: "4 years", height: "98-104cm", weight: "16-18kg" },
        { size: "5Y", age: "5 years", height: "104-110cm", weight: "18-21kg" },
        { size: "6Y", age: "6 years", height: "110-116cm", weight: "21-24kg" },
      ],
    },
  };

  const chart =
    sizeCharts[category as keyof typeof sizeCharts] || sizeCharts.kids;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {chart.title}
          </DialogTitle>
          <DialogDescription className="text-base">
            Find the perfect fit for your little one. All measurements are
            approximate.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {/* Size Chart Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-pink-50 border-b-2 border-pink-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Age
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Height
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">
                    Weight
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
                    <td className="px-4 py-3 text-gray-700">{row.age}</td>
                    <td className="px-4 py-3 text-gray-700">{row.height}</td>
                    <td className="px-4 py-3 text-gray-700">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Measurement Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-2">
              📏 Measurement Tips
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Height:</strong> Measure from the top of the head to
                  the bottom of the feet while standing straight.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Weight:</strong> Use a standard scale for accurate
                  measurements.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong>Between sizes?</strong> We recommend ordering the
                  larger size for a comfortable fit and room to grow.
                </span>
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
