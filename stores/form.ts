import { create } from "zustand";


type Plan = {
    planName: string;
    price: string;
    frequency: string;
    installments: string;
    validFrom: string;
    term: string;
    status: "active" | "draft";
};

type PaymentStore = {
    plans: Plan[];
    addPlan: (plan: Plan) => void;
    removePlan: (index: number) => void;
    editingPlan: Plan | null;
    setEditingPlan: (plan: Plan) => void;
};

export const usePaymentStore = create<PaymentStore>((set) => ({
    plans: [],
    editingPlan: null,

    addPlan: (plan) =>
        set((state) => ({
            plans: [...state.plans, plan],
        })),

    removePlan: (index) =>
        set((state) => ({
            plans: state.plans.filter((_, i) => i !== index),
        })),

    setEditingPlan: (plan) => set({ editingPlan: plan }),
}));
