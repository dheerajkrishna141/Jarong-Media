import useAvailability from "@/hooks/useAvailability";
import useHotels from "@/hooks/useHotels";
import {
  Badge,
  Card,
  createListCollection,
  Field,
  Flex,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Spinner,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { hotelDTOWithId } from "./Hotel/AddRoom";
import { toaster } from "../UI/toaster";
import useRooms from "@/hooks/useRooms";

const Availability = () => {
  const { data: roomData, isError, isLoading } = useRooms();
  const { data: hotelData, isError: isHotelError } = useHotels();

  const allHotels: hotelDTOWithId[] = hotelData || [];
  const [value, setValue] = useState<string[]>([]);
  useEffect(() => {
    if (isError || isHotelError) {
      toaster.create({
        title: "Fetch Error",
        description: "Error loading data! try after sometime",
        duration: 1 * 60 * 1000, //1 min
      });
    }
  }, []);

  const allRooms = useMemo(() => {
    if (value[0] === "all") return roomData;

    return roomData?.filter((room) => room.hotelId === value[0]);
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
      <Card.Root shadow={"lg"}>
        <Card.Header>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Room List
          </Text>
        </Card.Header>
        <Card.Body>
          <Flex justify="space-between" mb={4} gap={4} flexWrap="wrap"></Flex>
          <Field.Root mb={5}>
            <SelectRoot
              collection={hotels}
              width="320px"
              value={value}
              onValueChange={(e) => setValue(e.value)}
            >
              <SelectLabel>Select Hotel</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Select movie" />
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
          {isLoading && (
            <Flex align="center" justify="center">
              <VStack colorPalette="teal">
                <Spinner color="colorPalette.600" />
                <Text color="colorPalette.600">Loading...</Text>
              </VStack>
            </Flex>
          )}
          {!isLoading && (
            <Table.Root variant={"line"} borderRadius={"2xl"}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>ROOM ID</Table.ColumnHeader>
                  <Table.ColumnHeader>CATEGORY</Table.ColumnHeader>
                  <Table.ColumnHeader>PRICE PER NIGHT</Table.ColumnHeader>
                  <Table.ColumnHeader>AREA</Table.ColumnHeader>
                  <Table.ColumnHeader>BED TYPE</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {(value[0] ? allRooms : roomData)?.map((room) => (
                  <Table.Row key={room.id}>
                    <Table.Cell>{room.id}</Table.Cell>
                    <Table.Cell>{room.category}</Table.Cell>
                    <Table.Cell>${room.pricePerNight}</Table.Cell>
                    <Table.Cell>{room.features[0].area}</Table.Cell>
                    <Table.Cell>{room.features[0].bed_type}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default Availability;
