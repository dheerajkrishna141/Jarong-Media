import { Pagination } from "@/Components/Custom/pagination";
import useRequests, { QueryObject } from "@/hooks/useRequests";
import {
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Spinner,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const ViewRequests = () => {
  const [queryObject, setQueryObject] = useState({} as QueryObject);
  const { data: requests, isLoading } = useRequests(queryObject);

  if (requests?.totalElements === 0) {
    return (
      <Heading size="md" p={100}>
        No requests as of now.
      </Heading>
    );
  }
  return (
    <>
      <Card.Root shadow={"lg"} mt={5}>
        <Card.Header>
          <Heading size="md">Requests</Heading>
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
                    <Table.ColumnHeader>ID</Table.ColumnHeader>
                    <Table.ColumnHeader>FIRST NAME</Table.ColumnHeader>
                    <Table.ColumnHeader>EMAIL</Table.ColumnHeader>
                    <Table.ColumnHeader>TRAVEL TYPE</Table.ColumnHeader>
                    <Table.ColumnHeader>ARRIVAL FROM</Table.ColumnHeader>
                    <Table.ColumnHeader>ARRIVAL TO</Table.ColumnHeader>
                    <Table.ColumnHeader>CHECK IN</Table.ColumnHeader>
                    <Table.ColumnHeader>CHECK OUT</Table.ColumnHeader>
                    <Table.ColumnHeader>BUDGET</Table.ColumnHeader>
                    <Table.ColumnHeader>DATE CREATED</Table.ColumnHeader>
                    <Table.ColumnHeader>STATUS</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {requests?.content.map((request) => (
                    <Table.Row key={request.id}>
                      <Table.Cell>{request.id}</Table.Cell>
                      <Table.Cell>{request.firstName}</Table.Cell>
                      <Table.Cell>{request.email}</Table.Cell>
                      <Table.Cell>{request.travelType}</Table.Cell>
                      <Table.Cell>{request.arrivalFrom}</Table.Cell>
                      <Table.Cell>{request.arrivalTo}</Table.Cell>
                      <Table.Cell>{request.date1}</Table.Cell>
                      <Table.Cell>{request.date2}</Table.Cell>
                      <Table.Cell>${request.budget}</Table.Cell>
                      <Table.Cell>{request.createdDate}</Table.Cell>
                      <Table.Cell>
                        {request.status == "pending" ? (
                          <Badge size={"lg"} colorPalette="yellow">
                            {request.status}
                          </Badge>
                        ) : (
                          <Badge size={"lg"} colorPalette={"green"}>
                            {request.status}
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
                  totalPages={requests?.totalPages || 1}
                  currentPage={queryObject.pageNo}
                  onChange={(e) =>
                    setQueryObject({ ...queryObject, pageNo: e })
                  }
                  size="sm"
                  colorScheme="black"
                />
              </Flex>
            </Box>
          )}
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default ViewRequests;
