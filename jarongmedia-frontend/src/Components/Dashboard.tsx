import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Table,
  TableBody,
  TableHeader,
  TableRow,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import ProfilePop from "./ProfilePop";

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
        <Card.Root shadow={"lg"} mb={6}>
          <Card.Header>
            <Heading size="md">Reservations</Heading>
          </Card.Header>
          <Card.Body>
            <Box h="400px">
              {/* <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Booking Confirmed" fill="#BE185D" />
                    <Line type="monotone" dataKey="Booking Pending" stroke="#F97316" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer> */}
            </Box>
          </Card.Body>
        </Card.Root>
        <Card.Root shadow={"lg"}>
          <Card.Header>
            <Heading size="md">Today Booking List</Heading>
          </Card.Header>
          <Card.Body>
            <Flex justify="space-between" mb={4}>
              <Flex align="center" gap={2}>
                <Text>Show</Text>
                <Text>entries</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Text>Search:</Text>
                <Input w="200px" />
              </Flex>
            </Flex>
          </Card.Body>
        </Card.Root>
      </Box>
    </>
  );
};
