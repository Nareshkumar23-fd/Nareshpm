import React, { useMemo, useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Input,
  Modal,
  Form,
  Button,
  message,
  Tag,
  Space,
  Popconfirm,
} from "antd";

import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  useGetAllExperienceQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} from "../../redux/apis/Apis";

const Experience = () => {
  // ================= API =================
  const { data, isLoading } = useGetAllExperienceQuery();
  const [createExperience] = useCreateExperienceMutation();
  const [updateExperience] = useUpdateExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();

  const experiences = data?.experiences || [];

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isSuperAdmin = user?.role === "superadmin";

  // ================= STATE =================
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // ================= FILTER =================
  const filteredData = useMemo(() => {
    return experiences.filter(
      (item) =>
        item.company?.toLowerCase().includes(search.toLowerCase()) ||
        item.role?.toLowerCase().includes(search.toLowerCase())
    );
  }, [experiences, search]);

  // ================= STATS =================
  const totalExperience = experiences.length;

  const totalTechCount = experiences.reduce(
    (acc, item) => acc + (item.tech?.length || 0),
    0
  );

  const totalPointsCount = experiences.reduce(
    (acc, item) => acc + (item.points?.length || 0),
    0
  );

  // ================= CREATE =================
  const handleCreate = async (values) => {
    try {
      const formattedData = {
        ...values,
        tech: typeof values.tech === "string"
          ? values.tech.split(",").map(t => t.trim()).filter(Boolean)
          : values.tech,
        points: typeof values.points === "string"
          ? values.points.split(",").map(p => p.trim()).filter(Boolean)
          : values.points,
      };

      await createExperience(formattedData).unwrap();
      message.success("Experience created successfully");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create experience");
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (values) => {
    try {
      const formattedData = {
        ...values,
        tech: typeof values.tech === "string"
          ? values.tech.split(",").map(t => t.trim()).filter(Boolean)
          : values.tech,
        points: typeof values.points === "string"
          ? values.points.split(",").map(p => p.trim()).filter(Boolean)
          : values.points,
      };

      await updateExperience({
        id: editingRecord._id,
        ...formattedData,
      }).unwrap();

      message.success("Experience updated successfully");
      setIsModalOpen(false);
      setEditingRecord(null);
      form.resetFields();
    } catch (error) {
      message.error("Failed to update experience");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await deleteExperience(id).unwrap();
      message.success("Experience deleted successfully");
    } catch (error) {
      message.error("Failed to delete experience");
    }
  };

  // ================= OPEN MODAL =================
  const openCreateModal = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingRecord(record);
    form.setFieldsValue({
      company: record.company,
      role: record.role,
      desc: record.desc,
      tech: record.tech?.join(", "),
      points: record.points?.join(", "),
    });
    setIsModalOpen(true);
  };

  // ================= TABLE =================
  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Description",
      dataIndex: "desc",
      ellipsis: true,
    },
    {
      title: "Tech",
      dataIndex: "tech",
      render: (tech) =>
        tech?.map((t, i) => (
          <Tag color="purple" key={i}>
            {t}
          </Tag>
        )),
    },
    {
      title: "Points",
      dataIndex: "points",
      render: (points) => (
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          {points?.slice(0, 2).map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      ),
    },

    ...(isSuperAdmin ? [
      {
        title: "Actions",
        key: "actions",
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            {/* Edit Icon - Directly opens modal without confirmation */}
            <Button
              type="text"
              icon={<EditOutlined style={{ fontSize: "18px", color: "#a855f7" }} />}
              size="middle"
              onClick={() => openEditModal(record)}
              style={{ padding: "4px 8px" }}
            />

            {/* Delete Icon with Confirmation */}
            <Popconfirm
              title="Delete Experience"
              description="Are you sure you want to delete this experience?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { background: "#ff4d4f", borderColor: "#ff4d4f" } }}
              cancelButtonProps={{ style: { color: "#ff4d4f" } }}
            >
              <Button
                type="text"
                icon={<DeleteOutlined style={{ fontSize: "18px", color: "#ff4d4f" }} />}
                size="middle"
                danger
                style={{ padding: "4px 8px" }}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ] : [])
  ];

  return (
    <div style={{ padding: 16 }}>

      {/* ================= TOP CARDS ================= */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>

        <Col xs={24} sm={12} md={8}>
          <Card style={{ borderLeft: "5px solid #a855f7" }}>
            <h4>Total Experience</h4>
            <h2 style={{ color: "#a855f7" }}>{totalExperience}</h2>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card style={{ borderLeft: "5px solid #7c3aed" }}>
            <h4>Total Tech Skills Used</h4>
            <h2 style={{ color: "#7c3aed" }}>{totalTechCount}</h2>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <Card style={{ borderLeft: "5px solid #6d28d9" }}>
            <h4>Total Work Points</h4>
            <h2 style={{ color: "#6d28d9" }}>{totalPointsCount}</h2>
          </Card>
        </Col>

      </Row>

      {/* ================= SEARCH + BUTTON ================= */}
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={18}>
          <Input
            placeholder="Search by company or role..."
            prefix={<SearchOutlined />}
            value={search}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col xs={24} md={6}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
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
            Add Experience
          </Button>
        </Col>
      </Row>

      {/* ================= TABLE ================= */}
      <Card>
        <div style={{ overflowX: "auto" }}>
          <Table
            loading={isLoading}
            dataSource={filteredData}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 6 }}
            scroll={{ x: 1000 }}
          />
        </div>
      </Card>

      {/* ================= MODAL ================= */}
      <Modal
        title={editingRecord ? "Edit Experience" : "Add Experience"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingRecord(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okButtonProps={{
          style: {
            background: "#a855f7",
            borderColor: "#a855f7",
          },
        }}
      >
        <Form layout="vertical" form={form} onFinish={editingRecord ? handleUpdate : handleCreate}>

          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: "Please enter company name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please enter role" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="desc"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="tech"
            label="Tech (comma separated)"
            rules={[{ required: true, message: "Please enter tech skills" }]}
            extra="Enter technologies separated by commas (e.g., React, Node, MongoDB)"
          >
            <Input placeholder="React, Node, MongoDB" />
          </Form.Item>

          <Form.Item
            name="points"
            label="Points (comma separated)"
            rules={[{ required: true, message: "Please enter points" }]}
            extra="Enter achievements separated by commas"
          >
            <Input.TextArea placeholder="Built APIs, Improved performance, etc" rows={2} />
          </Form.Item>

        </Form>
      </Modal>

    </div>
  );
};

export default Experience;