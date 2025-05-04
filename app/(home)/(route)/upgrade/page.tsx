"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useUser } from "@clerk/nextjs";
import { getUserMembership } from "@/app/_services/index";
import { createMembershipCheckoutSession } from "@/app/_actions/createMembershipCheckoutSession";
import { redirect, useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { user } = useUser();
  const [membership, setMembership] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const enrollMembership = async () => {
      if (!user) return redirect("/sign-in");

      const email = user.emailAddresses[0]?.emailAddress;
      const membershipData = await getUserMembership(email);
      setMembership(membershipData);
    };

    enrollMembership();
  }, [user]);

  const handleCheckout = async (subscription: "month" | "year") => {
    if (!user) return redirect("/sign-in");
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
      sx={{
        flexGrow: 1,
        padding: 4,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      {membership ? (
        <Typography variant="h6" color="green">
          You already have an active membership!
        </Typography>
      ) : (
        <Grid
          container
          spacing={4} // Add spacing between grid items
          justifyContent="center" // Center the items horizontally
        >
          {/* Monthly Plan Card */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            component="div"
            sx={{ display: "flex", justifyContent: "center" }} // Optionally center the card
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3, // Optional: Add shadow for visual depth
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Monthly Plan
                </Typography>
                <Typography variant="body1" gutterBottom>
                  $23.99 per month
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Access all premium courses monthly.
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Free App Membership
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Unlock exclusive video content and downloadable materials.
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Learn at your own pace with no time limits or restrictions.
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Get personalized course recommendations tailored to your
                  goals.
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
          </Grid>

          {/* Yearly Plan Card */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            component="div"
            sx={{ display: "flex", justifyContent: "center" }} // Optionally center the card
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3, // Optional: Add shadow for visual depth
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  Yearly Plan
                </Typography>
                <Typography variant="body1" gutterBottom>
                  $199.99 per year
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Save more with a yearly membership.
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Free App Membership
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Enjoy the full library of premium courses, and exclusive
                  content.
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Gain lifetime access to purchased courses with no additional
                  fees.
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Save up to 30% compared to the monthly subscription plan.
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
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Page;
