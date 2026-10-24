import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Send, Trash2, X } from "lucide-react";
import SmartImage from "./SmartImage";
import { useEnquiry } from "../context/EnquiryContext";
import useBodyLock from "../hooks/useBodyLock";

export default function EnquiryDrawer() {
  const {
    items,
    open,
    closeDrawer,
    updateQty,
    removeItem,
    clear,
    sendWhatsApp,
  } = useEnquiry();
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeDrawer]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry list"
            // bg-charcoal ko bg-white kiya
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h2 className="text-3xl font-bold italic text-gray-900">
                Enquiry <span className="text-brand">List</span>
              </h2>
              <button
                onClick={closeDrawer}
                aria-label="Close enquiry list"
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="mt-16 text-center text-gray-500">
                  <p className="font-display text-2xl uppercase">
                    Your list is empty
                  </p>
                  <p className="mt-2 text-sm">
                    Add products to send one combined enquiry on WhatsApp.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li
                      key={i.key}
                      className="flex gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                    >
                      <SmartImage
                        src={i.image}
                        alt={i.name}
                        className="h-20 w-20 shrink-0 rounded bg-white"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-gray-900">
                          {i.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Model: {i.model} • Size:{" "}
                          <span className="text-brand font-semibold">
                            {i.size}
                          </span>
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => updateQty(i.key, i.qty - 1)}
                            aria-label="Decrease quantity"
                            className="rounded border border-gray-300 bg-white p-1 text-gray-700 hover:bg-brand hover:text-white hover:border-brand transition"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={i.qty}
                            onChange={(e) =>
                              updateQty(i.key, parseInt(e.target.value, 10))
                            }
                            aria-label={`Quantity for ${i.name}`}
                            className="w-14 rounded border border-gray-300 bg-white py-0.5 text-center text-sm text-gray-900 outline-none focus:border-brand"
                          />
                          <button
                            onClick={() => updateQty(i.key, i.qty + 1)}
                            aria-label="Increase quantity"
                            className="rounded border border-gray-300 bg-white p-1 text-gray-700 hover:bg-brand hover:text-white hover:border-brand transition"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeItem(i.key)}
                            aria-label={`Remove ${i.name}`}
                            className="ml-auto p-1 text-gray-400 hover:text-brand transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-3 border-t border-gray-200 p-5 bg-white">
                <button onClick={sendWhatsApp} className="btn btn-wa w-full">
                  <Send size={18} /> Send Enquiry on WhatsApp
                </button>
                <button
                  onClick={clear}
                  className="w-full text-sm text-gray-500 underline hover:text-brand"
                >
                  Clear list
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
