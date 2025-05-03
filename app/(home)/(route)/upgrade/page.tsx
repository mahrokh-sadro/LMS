// app/(upgrade)/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { getUserMembership } from "@/app/_services/index";
import { createMembershipCheckoutSession } from "@/app/_actions/createMembershipCheckoutSession";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { user } = useUser();
  const [membership, setMembership] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const enrollMembership = async () => {
      if (!user) return;
      const email = user.emailAddresses[0]?.emailAddress;
      const membershipData = await getUserMembership(email);
      setMembership(membershipData);
      console.log("Membership", membershipData);
    };

    enrollMembership();
  }, [user]);

  const handleCheckout = async (subscription: "month" | "year") => {
    if (!user) return;
    const email = user.emailAddresses[0]?.emailAddress;
    const sessionUrl = await createMembershipCheckoutSession(
      email,
      subscription
    );
    if (sessionUrl) {
      router.push(sessionUrl);
    } else {
      console.error("Session URL is null");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      gap={4}
      minHeight="100vh"
      flexWrap="wrap"
      p={4}
    >
      {membership ? (
        <Typography variant="h6" color="green">
          You already have an active membership!
        </Typography>
      ) : (
        <>
          {/* Monthly Plan */}
          <Card sx={{ width: 300, p: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Monthly Plan
              </Typography>
              <Typography variant="body1" gutterBottom>
                $23.99 per month
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Access all premium courses monthly.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleCheckout("month")}
              >
                Buy Monthly
              </Button>
            </CardContent>
          </Card>

          {/* Yearly Plan */}
          <Card sx={{ width: 300, p: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Yearly Plan
              </Typography>
              <Typography variant="body1" gutterBottom>
                $239.99 per year
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Save more with a yearly membership.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => handleCheckout("year")}
              >
                Buy Yearly
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default Page;
