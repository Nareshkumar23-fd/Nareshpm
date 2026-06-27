import React, { useMemo, useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Input,
  Modal,
  Form,
  InputNumber,
  Button,
  Space,
  message,
  Popconfirm,
  Tag,
} from "antd";

import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  useGetAllEducationQuery,
  useCreateEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} from "../../redux/apis/Apis";

const Education = () => {
  // ================= API =================
  const { data, isLoading } = useGetAllEducationQuery();
  const [createEducation] = useCreateEducationMutation();
  const [updateEducation] = useUpdateEducationMutation();
  const [deleteEducation] = useDeleteEducationMutation();

  const educations = data?.educations || [];

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isSuperAdmin = user?.role === "superadmin";


  // ================= STATE =================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [search, setSearch] = useState("");

  const [form] = Form.useForm();

  // ================= FILTER =================
  const filteredData = useMemo(() => {
    return educations.filter(
      (item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.institute?.toLowerCase().includes(search.toLowerCase())
    );
  }, [educations, search]);

  // ================= STATS =================
  const totalEducation = educations.length;

  const avgScore =
    educations.length > 0
      ? Math.round(
        educations.reduce((acc, cur) => acc + cur.score, 0) /
        educations.length
      )
      : 0;

  const highestScore = educations.reduce(
    (max, cur) => Math.max(max, cur.score || 0),
    0
  );

  // ================= OPEN MODAL =================
  const openCreate = () => {
    setEditingEducation(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingEducation(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (values) => {
    try {
      if (editingEducation) {
        await updateEducation({
          id: editingEducation._id,
          ...values,
        }).unwrap();

        message.success("Education updated");
      } else {
        await createEducation(values).unwrap();
        message.success("Education created");
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await deleteEducation(id).unwrap();
      message.success("Deleted successfully");
    } catch {
      message.error("Delete failed");
    }
  };

  // ================= TABLE =================
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      ellipsis: true,
    },
    {
      title: "Institute",
      dataIndex: "institute",
      sorter: (a, b) => a.institute.localeCompare(b.institute),
      ellipsis: true,
    },
    {
      title: "Score",
      dataIndex: "score",
      sorter: (a, b) => a.score - b.score,
      render: (val) => (
        <Tag color={val >= 80 ? "green" : val >= 60 ? "orange" : "red"}>
          {val}%
        </Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "desc",
      ellipsis: true,
    },

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
                title="Delete this education?"
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

      {/* ================= STATS CARDS ================= */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderLeft: "5px solid #a855f7" }}>
            <h4>Total Education</h4>
            <h2 style={{ color: "#a855f7" }}>{totalEducation}</h2>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderLeft: "5px solid #7c3aed" }}>
            <h4>Average Score</h4>
            <h2 style={{ color: "#7c3aed" }}>{avgScore}%</h2>
          </Card>
        </Col>

        <Col xs={24} sm={24} lg={8}>
          <Card>
            <h4>Highest Score</h4>
            <h2 style={{ color: "#6d28d9" }}>{highestScore}%</h2>
          </Card>
        </Col>
      </Row>

      {/* ================= SEARCH + BUTTON ================= */}
      <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={18}>
          <Input
            placeholder="Search education..."
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
            Add Education
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
            scroll={{ x: 700 }}
          />
        </div>
      </Card>

      {/* ================= MODAL ================= */}
      <Modal
        title={editingEducation ? "Update Education" : "Create Education"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingEducation ? "Update" : "Create"}
        okButtonProps={{
          style: {
            background: "#a855f7",
            borderColor: "#a855f7",
          },
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter title (e.g. B.Sc Computer Science)" />
          </Form.Item>

          <Form.Item
            name="institute"
            label="Institute"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter institute name" />
          </Form.Item>

          <Form.Item
            name="score"
            label="Score (%)"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: "100%" }}
              placeholder="Enter score"
            />
          </Form.Item>

          <Form.Item name="desc" label="Description">
            <Input.TextArea placeholder="Optional description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Education;