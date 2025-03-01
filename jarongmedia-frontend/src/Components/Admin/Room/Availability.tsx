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
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Spinner,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { SelectLabel } from "../../UI/select";
import { toaster } from "../../UI/toaster";
import { hotelDTOWithId } from "../Hotel/AddRoom";

const Availability = () => {
  const { data: availabilityData, isError, isLoading } = useAvailability();
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

  const allAvailability = useMemo(() => {
    return availabilityData?.filter(
      (availability) => availability.hotelId === value[0]
    );
  }, [value]);

  const hotels = createListCollection({
    items: allHotels.map((hotel) => ({
      label: hotel.name,
      value: hotel.id,
    })),
  });

  return (
    <div>
      <Card.Root shadow={"lg"}>
        <Card.Header>
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Availability Status
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
                  <Table.ColumnHeader>CHECK IN</Table.ColumnHeader>
                  <Table.ColumnHeader>CHECK OUT</Table.ColumnHeader>
                  <Table.ColumnHeader>STATUS</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {(value[0] ? allAvailability : availabilityData)?.map(
                  (availability) => (
                    <Table.Row key={availability.id}>
                      <Table.Cell>{availability.roomId}</Table.Cell>
                      <Table.Cell>{availability.checkInDate}</Table.Cell>
                      <Table.Cell>{availability.checkOutDate}</Table.Cell>
                      <Table.Cell>
                        {availability.status == "available" ? (
                          <Badge size={"lg"} colorPalette="green">
                            Available
                          </Badge>
                        ) : (
                          <Badge size={"lg"} colorPalette={"yellow"}>
                            Booked
                          </Badge>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  )
                )}
              </Table.Body>
            </Table.Root>
          )}
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default Availability;
