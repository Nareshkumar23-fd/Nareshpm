import React, { useMemo, useState } from "react";
import {
  Table,
  Card,
  Spin,
  Tag,
  Space,
  Popconfirm,
  Modal,
  Form,
  Input,
  Select,
  message,
  Row,
  Col,
  Button,
} from "antd";

import {
  UserOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} from "../../redux/apis/Apis.js";

const UserManagement = () => {
  const { data, isLoading, isError } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const users = data?.users || [];


  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isSuperAdmin = user?.role === "superadmin";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState(null);

  const [form] = Form.useForm();

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchText.toLowerCase());

      const matchRole = roleFilter ? u.role === roleFilter : true;

      return matchSearch && matchRole;
    });
  }, [users, searchText, roleFilter]);

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === "superadmin").length;
  const normalUsers = users.filter((u) => u.role === "user").length;

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      message.success("User deleted");
    } catch {
      message.error("Delete failed");
    }
  };

  const openCreate = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        await updateUser({ id: editingUser._id, ...values }).unwrap();
        message.success("User updated");
      } else {
        await createUser(values).unwrap();
        message.success("User created");
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch {
      message.error("Something went wrong");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => (
        <Space>
          <UserOutlined style={{ color: "#a855f7" }} />
          {text}
        </Space>
      ),
    },
    { title: "Email", dataIndex: "email" },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => (
        <Tag color={role === "superadmin" ? "purple" : "blue"}>
          {role || "user"}
        </Tag>
      ),
    },
    { title: "Contact", dataIndex: "contact" },


    ...(isSuperAdmin
      ? [
        {
          title: "Actions",
          render: (_, record) => (
            <Space>
              <EditOutlined
                onClick={() => openEdit(record)}
                style={{
                  color: "#a855f7",
                  fontSize: 18,
                  cursor: "pointer",
                }}
              />

              <Popconfirm
                title="Delete this user?"
                onConfirm={() => handleDelete(record._id)}
              >
                <DeleteOutlined
                  style={{
                    color: "red",
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                />
              </Popconfirm>
            </Space>
          ),
        },
      ]
      : []),
  ];

  return (
    <div style={{ padding: 16 }}>

      {/* ================= RESPONSIVE CARDS ================= */}
      <Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} md={8}>
          <Card style={{ borderLeft: "5px solid #a855f7" }}>
            <h4>Total Users</h4>
            <h2 style={{ color: "#a855f7" }}>{totalUsers}</h2>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={{ borderLeft: "5px solid #7c3aed" }}>
            <h4>Users</h4>
            <h2 style={{ color: "#7c3aed" }}>{normalUsers}</h2>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={{ borderLeft: "5px solid #6d28d9" }}>
            <h4>Super Admin</h4>
            <h2 style={{ color: "#6d28d9" }}>{adminCount}</h2>
          </Card>
        </Col>
      </Row>

      {/* ================= RESPONSIVE FILTERS ================= */}
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Input
            placeholder="Search users..."
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>

        <Col xs={24} md={6}>
          <Select
            placeholder="Filter Role"
            allowClear
            style={{ width: "100%" }}
            onChange={(value) => setRoleFilter(value)}
            options={[
              { value: "user", label: "User" },
              { value: "superadmin", label: "Super Admin" },
            ]}
          />
        </Col>

        <Col xs={24} md={6}>
          <Button
            onClick={openCreate}
            disabled={!isSuperAdmin}
            style={{
              width: "100%",
              background: isSuperAdmin ? "#a855f7" : "#d1d5db",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              cursor: isSuperAdmin ? "pointer" : "not-allowed",
              opacity: isSuperAdmin ? 1 : 0.6,
            }}
          >
            <PlusOutlined /> Create User
          </Button>
        </Col>
      </Row>

      {/* ================= TABLE ================= */}
      <Card>
        {isLoading ? (
          <Spin />
        ) : isError ? (
          <p>Error loading users</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <Table
              dataSource={filteredUsers}
              columns={columns}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: 600 }}   // 🔥 important for mobile
            />
          </div>
        )}
      </Card>

      {/* ================= MODAL ================= */}
      <Modal
        title={editingUser ? "Update User" : "Create User"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingUser ? "Update" : "Create"}
        okButtonProps={{
          style: { backgroundColor: "#a855f7", borderColor: "#a855f7" },
        }}
        width={window.innerWidth < 768 ? "95%" : 520}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item name="contact" label="Contact">
            <Input placeholder="Enter contact" />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Select
              placeholder="Select role"
              options={[
                { value: "user", label: "User" },
              ]}
            />
          </Form.Item>

          {!editingUser && (
            <Form.Item name="password" label="Password">
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;