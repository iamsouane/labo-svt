import type { FC } from "react";

interface VisualisationCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const VisualisationCard: FC<VisualisationCardProps> = ({ title, description, onClick }) => (
  <div
    className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
    onClick={onClick}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export default VisualisationCard;