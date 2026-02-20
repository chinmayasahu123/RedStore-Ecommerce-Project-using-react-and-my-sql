import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ email }) => {
    toast.success('Subscribed successfully!');
    reset();
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-2xl bg-gradient-to-r from-amber-200 via-rose-200 to-orange-200 dark:from-amber-500/20 dark:via-rose-500/20 dark:to-orange-500/20 p-6 md:p-10">
        <h3 className="text-2xl md:text-3xl font-extrabold text-center">Join Our Exclusive List for Special Offers</h3>
        <p className="text-center text-gray-700 dark:text-gray-300 mt-2">Exclusive drops, early access, and VIP offers.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-xl mx-auto flex gap-2">
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-surface outline-none"
          />
          <button type="submit" className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-semibold">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
