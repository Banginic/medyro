import { Button } from "@/components/ui/button";

function TransferSettings({ projectId }: { projectId: string }) {
  return (
    <section className="border p-4 rounded-md  w-[95%] max-w-2xl mx-auto">
      <h2 className="cart-title mb-4">Transfer Project</h2>
      <div className="text-sm text-foreground/70">
        <p>
          You can only transfer projects to an organization you are a member of.
          Transfers are instant, with no downtime.
        </p>
      </div>

      <Button
        size={"sm"}
        variant={"secondary"}
        className="mt-8  cursor-not-allowed"
      >
        Transfer Project
      </Button>
    </section>
  );
}

export default TransferSettings;
