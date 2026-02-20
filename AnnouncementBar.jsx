import { useEffect, useState } from 'react';
import { FaTruck, FaTag } from 'react-icons/fa';

export default function AnnouncementBar() {
  const messages = [
    { id: 1, icon: FaTruck, text: 'Free shipping on orders over ₹999' },
    { id: 2, icon: FaTag, text: 'Festival Sale: Up to 40% OFF today' },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);

  const MsgIcon = messages[index].icon;

  return (
    <div className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-2">
        <MsgIcon className="opacity-90" />
        <span className="font-medium">{messages[index].text}</span>
      </div>
    </div>
  );
}
