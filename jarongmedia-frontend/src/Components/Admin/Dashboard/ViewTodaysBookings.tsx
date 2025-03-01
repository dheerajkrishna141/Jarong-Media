import useTodayBookings from "@/hooks/useTodayBookings";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  Spinner,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/Components/UI/pagination";
import { Pagination } from "@/Components/Custom/pagination";

const ViewTodaysBookings = () => {
  const getCurrentDateFormatted = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  console.log(getCurrentDateFormatted());

  const [page, setPage] = useState(1);
  const { data: todaysBookings, isLoading } = useTodayBookings(
    getCurrentDateFormatted(),
    page
  );

  if (todaysBookings?.totalElements === 0)
    return (
      <Box className="flex justify-center">
        <Text fontSize={"md"}>No Bookings Today</Text>
      </Box>
    );
  return (
    <Card.Root shadow={"lg"}>
      <Card.Header>
        <Heading size="md">Today Booking List</Heading>
      </Card.Header>
      <Card.Body>
        {isLoading && (
          <Flex align="center" justify="center">
            <VStack colorPalette="teal">
              <Spinner color="colorPalette.600" />
              <Text color="colorPalette.600">Loading...</Text>
            </VStack>
          </Flex>
        )}

        {!isLoading && (
          <Box justifyContent={"center"}>
            <Table.Root variant={"line"} borderRadius={"2xl"}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>ROOM NUMBER</Table.ColumnHeader>
                  <Table.ColumnHeader>HOTEL ID</Table.ColumnHeader>
                  <Table.ColumnHeader>CHECK IN</Table.ColumnHeader>
                  <Table.ColumnHeader>CHECK OUT</Table.ColumnHeader>
                  <Table.ColumnHeader>CONFIRMATION CODE</Table.ColumnHeader>
                  <Table.ColumnHeader>STATUS</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {todaysBookings?.content.map((booking) => (
                  <Table.Row key={booking.id}>
                    <Table.Cell>{booking.roomId}</Table.Cell>
                    <Table.Cell>{booking.hotelId}</Table.Cell>
                    <Table.Cell>{booking.checkInDate}</Table.Cell>
                    <Table.Cell>{booking.checkOutDate}</Table.Cell>
                    <Table.Cell>{booking.confirmationCode}</Table.Cell>
                    <Table.Cell>
                      {booking.status == "booked" ? (
                        <Badge size={"lg"} colorPalette="green">
                          Booked
                        </Badge>
                      ) : (
                        <Badge size={"lg"} colorPalette={"yellow"}>
                          {booking.status}
                        </Badge>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>

            <Flex justifyContent={"center"} mt={4}>
              <Pagination
                showFirstLastButtons={false}
                totalPages={todaysBookings?.totalPages || 1}
                currentPage={page}
                onChange={(e) => setPage(e)}
                size="sm"
                colorScheme="black"
              />
            </Flex>
          </Box>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export default ViewTodaysBookings;
