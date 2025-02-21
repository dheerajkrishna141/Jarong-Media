import { Card, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import { ImAccessibility } from "react-icons/im";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import { LuDoorClosed, LuHouse } from "react-icons/lu";
import { MdOutlineEventAvailable } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Hotel = () => {
  const actions = [
    {
      title: "Add Hotel",
      icon: "house",
      description: "Add description",
      navigateTo: "addHotel",
    },
    {
      title: "Add Room",
      icon: "door",
      description: "Add description",
      navigateTo: "addRoom",
    },
    {
      title: "Add Feature",
      icon: "features",
      description: "Add description",
      navigateTo: "addFeature",
    },
    {
      title: "Add Availability",
      icon: "availability",
      description: "Add description",
      navigateTo: "addAvailability",
    },
    {
      title: "Add Promocodes",
      icon: "promocode",
      description: "Add description",
      navigateTo: "addPromocode",
    },
  ];

  const navigate = useNavigate();
  const getIcon = (icon: string) => {
    switch (icon) {
      case "house":
        return <LuHouse />;
      case "door":
        return <LuDoorClosed />;
      case "features":
        return <ImAccessibility />;
      case "availability":
        return <MdOutlineEventAvailable />;
      case "promocode":
        return <RiCouponFill />;
      default:
        return null;
    }
  };

  const location = useLocation();
  const isChildrenRouteActive = actions.some((action) =>
    location.pathname.includes(action.navigateTo)
  );
  return (
    <div>
      {isChildrenRouteActive ? (
        <Outlet></Outlet>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={4}
          mb={6}
        >
          {actions.map((metric, i) => (
            <Card.Root
              shadow={"lg"}
              key={i}
              cursor={"pointer"}
              _hover={{
                transform: "scale(1.03)",
                transition: "transform 0.2s ease-in-out",
              }}
              onClick={() => {
                navigate("/admin/hotel/" + metric.navigateTo);
              }}
            >
              <Card.Body>
                <Stack gap={2}>
                  {getIcon(metric.icon)}
                  <Text fontSize="md">{metric.title}</Text>
                  <Flex align="center">
                    {/* <Badge
                              colorScheme={metric.color}
                              display="flex"
                              alignItems="center"
                              borderRadius="full"
                              px={2}
                              py={1}
                            > */}
                    <IoChevronUpCircleOutline />
                    {/* </Badge> */}
                    <Text ml={2} fontSize="sm" color="gray.500">
                      {metric.description}
                    </Text>
                  </Flex>
                </Stack>
              </Card.Body>
            </Card.Root>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Hotel;
