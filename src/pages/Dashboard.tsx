import OverallSummary from "@/components/OverallSummary";
import PendingTaskSummary from "@/components/PendingTaskSummary";
import { Layers } from "lucide-react";
import InsightTable from "@/components/InsightTable.jsx.tsx";

const Dashboard = () => {

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="font-primary flex items-center space-x-2 text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
                    <Layers size={32} />
                    <span>Dashboard</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <OverallSummary />
                    <PendingTaskSummary />
                </div>
                <div className="mt-8">
                    <InsightTable />
                </div>
        </div>
    );
};

export default Dashboard;