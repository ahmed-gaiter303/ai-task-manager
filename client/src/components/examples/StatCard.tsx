import StatCard from '../StatCard';
import { CheckCircle2 } from 'lucide-react';

export default function StatCardExample() {
  return <StatCard title="Total Tasks" value={24} icon={CheckCircle2} gradient />;
}
