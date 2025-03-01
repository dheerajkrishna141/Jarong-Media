import useBookings from "@/hooks/useBookings";
import useHotels from "@/hooks/useHotels";
import {
  Badge,
  Box,
  Button,
  Card,
  createListCollection,
  Field,
  Flex,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Table,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/Components/UI/pagination";
import { hotelDTOWithId } from "./Hotel/AddRoom";
import { InputGroup } from "../UI/input-group";
import { LuSearch } from "react-icons/lu";
import { Pagination } from "../Custom/pagination";

const AllBookings = () => {
  const [page, setPage] = useState(1);
  const [searchOut, setSearchOut] = useState("");
  const { data: bookingData } = useBookings({
    pageNo: page,
    searchInput: searchOut,
  });
  const { data: hotelData } = useHotels();
  const [value, setValue] = useState<string[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const allHotels: hotelDTOWithId[] = hotelData || [];

  const allBookings = useMemo(() => {
    if (value[0] === "all") return bookingData?.content;

    return bookingData?.content.filter(
      (booking) => value[0] === booking.hotelId
    );
  }, [value]);

  const hotels = createListCollection({
    items: [
      { label: "All Hotels", value: "all" },
      ...allHotels.map((hotel) => ({
        label: hotel.name,
        value: hotel.id,
      })),
    ],
  });

  return (
    <div>
      <Card.Root>
        <Card.Header>All Bookings</Card.Header>

        <Card.Body>
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (ref.current) {
                setSearchOut(ref.current.value);
              }
            }}
          >
            <HStack
              justifyContent={"space-around"}
              mb={5}
              gap={10}
              alignItems={"end"}
            >
              <Field.Root>
                <SelectRoot
                  collection={hotels}
                  value={value}
                  onValueChange={(e) => setValue(e.value)}
                >
                  <SelectLabel>Select Hotel</SelectLabel>
                  <SelectTrigger>
                    <SelectValueText placeholder="Select hotel" />
                  </SelectTrigger>
                  <SelectContent>
                    {hotels.items.map((hotel) => (
                      <SelectItem item={hotel} key={hotel.value}>
                        {hotel.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field.Root>

              <Field.Root>
                <Field.Label>Confirmation Code</Field.Label>
                <InputGroup startElement={<LuSearch />} width="full">
                  <Input
                    ref={ref}
                    placeholder="Search by confirmation code"
                  ></Input>
                </InputGroup>
              </Field.Root>
              <Button type="submit">Search</Button>
            </HStack>
          </Box>
          <Table.Root variant={"line"} borderRadius={"2xl"}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>ROOM NUMBER</Table.ColumnHeader>
                <Table.ColumnHeader>CHECK IN</Table.ColumnHeader>
                <Table.ColumnHeader>CHECK OUT</Table.ColumnHeader>
                <Table.ColumnHeader>CONFIRMATION CODE</Table.ColumnHeader>
                <Table.ColumnHeader>STATUS</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(value[0] ? allBookings : bookingData?.content)?.map(
                (booking) => (
                  <Table.Row key={booking.id}>
                    <Table.Cell>{booking.roomId}</Table.Cell>
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
                )
              )}
            </Table.Body>
          </Table.Root>

          <Flex justifyContent={"center"} mt={4}>
            <Pagination
              showFirstLastButtons={false}
              totalPages={bookingData?.totalPages || 1}
              currentPage={page}
              onChange={(e) => setPage(e)}
              size="sm"
              colorScheme="black"
            />
          </Flex>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default AllBookings;
