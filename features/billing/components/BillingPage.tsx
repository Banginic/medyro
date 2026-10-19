"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  CreditCard,
  Receipt,
  Sparkles,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/* ---------- Content (edit here, or swap for French copy) ---------- */
const FREE_FEATURES = [
  "Full access to every feature",
  "Unlimited projects",
  "Community support",
  "Regular updates",
];

const UPCOMING_PLANS = [
  {
    name: "Pro",
    description: "For growing teams that need more power and priority support.",
    features: ["Everything in Free", "Priority support", "Advanced analytics"],
  },
  {
    name: "Business",
    description: "For organizations that need custom limits and onboarding.",
    features: ["Everything in Pro", "Team roles", "Dedicated onboarding"],
  },
];

const USAGE = [
  { label: "Projects", used: 3, limit: null as number | null },
  { label: "Storage", used: 0.4, limit: null as number | null, unit: "GB" },
];

export default function BillingPage() {
  const [notified, setNotified] = useState(false);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-10 sm:px-6 lg:py-14">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Billing
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Manage your plan, payment methods and invoices. Everything is free
          for now, so there is nothing to pay.
        </p>
      </motion.header>

      {/* Current plan */}
      <Card className="relative overflow-hidden border-primary/20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        />
        <CardHeader className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl">Free plan</CardTitle>
              <Badge className="gap-1">
                <Sparkles className="h-3 w-3" /> Active
              </Badge>
            </div>
            <CardDescription>
              You have full access at no cost while we are in free mode.
            </CardDescription>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-4xl font-semibold tracking-tight">0 XAF</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </div>
        </CardHeader>
        <CardContent className="relative grid gap-6 sm:grid-cols-2">
          <ul className="space-y-3">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
            <p className="text-sm font-medium">Current usage</p>
            {USAGE.map((u) => (
              <div key={u.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{u.label}</span>
                  <span>
                    {u.used}
                    {u.unit ? ` ${u.unit}` : ""} · No limit
                  </span>
                </div>
                <Progress value={Math.min(u.used * 5, 100)} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment + invoices */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Payment method</CardTitle>
            </div>
            <CardDescription>
              No payment method needed on the free plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              Nothing to add yet
            </div>
            <Button variant="outline" disabled className="w-full">
              Add payment method
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">Invoices</CardTitle>
            </div>
            <CardDescription>
              Your invoices will appear here once paid plans launch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No invoices
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming plans */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            Coming soon
          </h2>
          <p className="text-sm text-muted-foreground">
            Paid plans are on the way. You will be told before anything changes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {UPCOMING_PLANS.map((plan) => (
            <Card key={plan.name} className="opacity-90">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <Badge variant="secondary">Soon</Badge>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-muted-foreground" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 rounded-xl border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
            <p className="max-w-md text-sm text-muted-foreground">
              Your free access is not affected. We will announce pricing well
              before any plan becomes paid.
            </p>
          </div>
          <Button
            onClick={() => setNotified(true)}
            disabled={notified}
            className="gap-2"
          >
            <Bell className="h-4 w-4" />
            {notified ? "You will be notified" : "Notify me about pricing"}
          </Button>
        </div>
      </section>
    </main>
  );
}