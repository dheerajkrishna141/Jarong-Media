import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/dialog";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Separator,
  Text,
} from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import usa from "@/assets/usa.jpg";
import gambia from "@/assets/gambia.jpg";

export const Header = () => (
  <Box as="header" py={4}>
    <Container maxW="container.xl">
      <Flex justify="space-between" align="center">
        <Text fontSize={"4xl"} fontFamily={"sans-serif"} fontWeight="bold">
          Jarong Media
        </Text>
        <Flex as="nav" gap={4}>
          <Link to="#">
            <Text fontSize={"lg"}>Packages</Text>
          </Link>
          <DialogRoot placement={"center"} motionPreset="slide-in-bottom">
            <DialogTrigger asChild>
              <Text fontSize={"lg"} _hover={{ cursor: "pointer" }}>
                Bookings
              </Text>
            </DialogTrigger>
            <DialogContent position={"absolute"} top={100}>
              <DialogHeader>
                <DialogTitle>Select Location</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Flex direction="row" justifyContent={"space-around"} gap={4}>
                  <Link to="/user/booking">
                    <Box textAlign="center">
                      <Image
                        src={gambia}
                        alt="Gambia"
                        style={{ width: "100%", height: "100%" }}
                      />
                      <Text fontSize={"lg"} mt={2}>
                        Gambia
                      </Text>
                    </Box>
                  </Link>

                  <Separator orientation={"vertical"} size={"md"} />
                  <Link to="/request">
                    <Box textAlign="center">
                      <Image
                        src={usa}
                        alt="USA"
                        style={{ width: "100%", height: "100%" }}
                      />
                      <Text fontSize={"lg"} mt={2}>
                        USA
                      </Text>
                    </Box>
                  </Link>
                </Flex>
              </DialogBody>
              <DialogFooter></DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
          <Link to="#">
            <Text fontSize={"lg"}>Gallery</Text>
          </Link>
        </Flex>
      </Flex>
    </Container>
  </Box>
);
