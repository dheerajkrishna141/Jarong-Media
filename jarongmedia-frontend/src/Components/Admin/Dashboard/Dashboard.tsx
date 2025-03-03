import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import ViewTodaysBookings from "./ViewTodaysBookings";
import ViewRequests from "./ViewRequests";

const metrics = [
  {
    title: "Today Booking",
    value: "1,587",
    change: "+11%",
    description: "From previous period",
    color: "purple",
  },
  {
    title: "Total Amount",
    value: "$2,258",
    change: "+05%",
    description: "New income",
    color: "blue",
  },
  {
    title: "Total Customer",
    value: "2.3k",
    change: "+11%",
    description: "From previous period",
    color: "yellow",
  },
  {
    title: "Total Revenue",
    value: "11,5587",
    change: "+21%",
    description: "From previous period",
    color: "green",
  },
];
export const Dashboard = () => {
  return (
    <>
      <Box mb={20}>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={4}
          mb={6}
        >
          {metrics.map((metric, i) => (
            <Card.Root shadow={"lg"} key={i}>
              <Card.Body>
                <Stack gap={2}>
                  <Text fontSize="md">{metric.title}</Text>
                  <Heading size="lg">{metric.value}</Heading>
                  <Flex align="center">
                    <Badge
                      colorScheme={metric.color}
                      display="flex"
                      alignItems="center"
                      borderRadius="full"
                      px={2}
                      py={1}
                    >
                      <IoChevronUpCircleOutline />
                      {metric.change}
                    </Badge>
                    <Text ml={2} fontSize="sm" color="gray.500">
                      {metric.description}
                    </Text>
                  </Flex>
                </Stack>
              </Card.Body>
            </Card.Root>
          ))}
        </Grid>

        <ViewTodaysBookings></ViewTodaysBookings>
        <ViewRequests />
      </Box>
    </>
  );
};
