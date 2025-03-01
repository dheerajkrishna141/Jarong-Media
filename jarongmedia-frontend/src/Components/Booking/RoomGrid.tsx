import roomPic from "@/assets/room.jpg";
import useRoomAvailability from "@/hooks/useRoomAvailability";
import useRooms from "@/hooks/useRooms";
import useBookingQueryStore from "@/stateManagement/Store";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useMemo, useState, type FC } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { TbResize } from "react-icons/tb";
import { Link } from "react-router-dom";

import { Pagination } from "../Custom/pagination";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../UI/pagination";

interface Room {
  id: number;
  image: string;
  title: string;
  price: string;
}

const RoomGrid: FC = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const availabilityQuery = useBookingQueryStore((s) => s.bookingQuery);
  const setRoom = useBookingQueryStore((s) => s.setRoom);
  const { data: roomData } = useRooms(page);
  const { data: availability, isFetched } = useRoomAvailability(
    availabilityQuery?.checkInDate,
    availabilityQuery?.checkOutDate
  );

  useMemo(() => {
    if (availability?.length === 0 && isFetched) {
      setStatus("No Rooms found for that date range.");
    }
  }, [availability]);

  return (
    <Box py={16} px={4}>
      <VStack gap={12} maxW="1200px" mx="auto">
        <Heading size="2xl">{status}</Heading>

        <Heading size="2xl">DISCOVER OUR ROOMS</Heading>

        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
          w="full"
        >
          {(availability ? availability : roomData?.content)?.map((room) => (
            <Card.Root shadow={"md"} borderRadius={"xl"} key={room.id}>
              <Image
                borderTopRadius={"xl"}
                src={roomPic}
                alt={room.id}
                w="full"
                h="auto"
              />
              <Card.Body>
                <Card.Title fontSize="xl" fontWeight="bold">
                  {room.id}
                </Card.Title>
                <Card.Description>{room.category}</Card.Description>
                <HStack
                  mt={8}
                  alignContent={"flex-start"}
                  justifyContent={"space-around"}
                >
                  <Badge overflow={"hidden"} fontSize={"15px"} size={"lg"}>
                    {" "}
                    <FaPeopleGroup />
                    {room.capacity}
                  </Badge>
                  <Badge overflow={"hidden"} fontSize={"15px"} size={"lg"}>
                    <TbResize />
                    {room.features[0].area}
                  </Badge>
                  <Badge overflow={"hidden"} fontSize={"15px"} size={"lg"}>
                    <MdAttachMoney />${room.pricePerNight}/night
                  </Badge>
                </HStack>
                <Flex mt={3} justifyContent={"end"}>
                  <Link to={`/user/booking/rooms/${room.id}`}>
                    <Button
                      mt={5}
                      colorPalette={"purple"}
                      size={"sm"}
                      onClick={() => {
                        setRoom(room);
                      }}
                    >
                      View Details
                    </Button>
                  </Link>
                </Flex>
              </Card.Body>
            </Card.Root>
          ))}
        </Grid>

        {!availability && (
          <Pagination
            size="sm"
            colorScheme="purple"
            showFirstLastButtons={false}
            totalPages={roomData?.totalPages || 1}
            currentPage={page}
            onChange={(page) => setPage(page)}
          />
        )}
      </VStack>
    </Box>
  );
};

export default RoomGrid;
