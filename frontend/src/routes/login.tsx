import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { storeAuth } from "@/lib/auth";
import { authApi } from "@/lib/api";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

const loginSearchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  head: () => ({ meta: [{ title: "Sign In — Revive Market" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      storeAuth(data.token, data.user);

      if (redirect) {
        navigate({ to: redirect });
      } else {
        const role = data.user.role;
        if (role === "admin") navigate({ to: "/admin" });
        else if (role === "technician") navigate({ to: "/staff" });
        else navigate({ to: "/account" });
      }
      toast.success(`Welcome back, ${data.user.name}!`);
    } catch (e: any) {
      toast.error(e.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-md px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your Revive Market account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.cm" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" search={redirect ? { redirect } : undefined} className="font-medium text-accent hover:underline">Create one</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
}
