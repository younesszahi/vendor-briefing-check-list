import ChecklistForm from '@/components/checklist-form';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <ChecklistForm />
      </div>
    </main>
  );
}