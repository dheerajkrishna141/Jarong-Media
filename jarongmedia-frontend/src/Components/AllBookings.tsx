import useBookings from "@/hooks/useBookings";
import { Table, Badge, Card, HStack, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "./UI/pagination";

const AllBookings = () => {
  const [page, setPage] = useState(1);
  const { data: allBookings } = useBookings(page);

  console.log(allBookings);

  return (
    <div>
      <Card.Root>
        <Card.Header>All Bookings</Card.Header>

        <Card.Body>
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
              {allBookings?.content.map((booking) => (
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
            <PaginationRoot
              count={allBookings?.totalPages || 1}
              page={page}
              onPageChange={(e) => setPage(e.page)}
            >
              <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </Flex>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default AllBookings;
