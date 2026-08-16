import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, Section, SiteShell } from "@/components/site/site-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Langport — Talk to our team" },
      {
        name: "description",
        content:
          "Questions about English programs, levels, schedules or payment? Contact the Langport team by WhatsApp, phone, email or the contact form.",
      },
      { property: "og:title", content: "Contact Langport" },
      { property: "og:description", content: "We reply within one working day." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <PageHero title={t("contact.title")} subtitle={t("contact.sub")} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardContent className="p-7">
              <form
                className="grid gap-5 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  toast.success(t("contact.sent"));
                  (e.target as HTMLFormElement).reset();
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.name")}</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("reg.email")}</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="topic">{t("support.topic")}</Label>
                  <Input id="topic" required />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">{t("support.message")}</Label>
                  <Textarea id="message" rows={6} required />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" size="lg">
                    {t("contact.send")}
                  </Button>
                  {sent ? (
                    <p className="mt-3 text-sm text-muted-foreground">{t("contact.sent")}</p>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {[
              { icon: MessageCircle, label: t("support.whatsapp"), value: "+20 100 000 0000" },
              { icon: Phone, label: t("support.phone"), value: "+20 2 1234 5678" },
              { icon: Mail, label: t("support.email"), value: "hello@langport.com" },
              { icon: MapPin, label: t("footer.contact"), value: "Cairo, Egypt" },
            ].map((c) => (
              <Card key={c.label}>
                <CardContent className="flex items-center gap-4 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">{c.label}</span>
                    <span className="block font-semibold" dir="ltr">
                      {c.value}
                    </span>
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
