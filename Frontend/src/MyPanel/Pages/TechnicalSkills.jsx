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
  Tag,
  message,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  StarOutlined,
} from "@ant-design/icons";

import {
  useGetAllSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "../../redux/apis/Apis";

const TechnicalSkills = () => {
  const { data, isLoading } = useGetAllSkillsQuery();
  const [createSkill] = useCreateSkillMutation();
  const [updateSkill] = useUpdateSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const skills = data?.skills || [];


  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isSuperAdmin = user?.role === "superadmin";

  // ================= STATE =================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [search, setSearch] = useState("");

  const [form] = Form.useForm();

  // ================= FILTER =================
  const filteredSkills = useMemo(() => {
    return skills.filter(
      (s) =>
        s.skillName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [skills, search]);

  // ================= CARDS =================
  const totalSkills = skills.length;
  const avgSkill =
    skills.length > 0
      ? Math.round(
        skills.reduce((acc, s) => acc + s.percentage, 0) /
        skills.length
      )
      : 0;

  // ================= OPEN MODAL =================
  const openCreate = () => {
    setEditingSkill(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingSkill(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (values) => {
    try {
      if (editingSkill) {
        await updateSkill({
          id: editingSkill._id,
          ...values,
        }).unwrap();
        message.success("Skill updated");
      } else {
        await createSkill(values).unwrap();
        message.success("Skill created");
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch {
      message.error("Something went wrong");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await deleteSkill(id).unwrap();
      message.success("Skill deleted");
    } catch {
      message.error("Delete failed");
    }
  };

  // ================= TABLE =================
  const columns = [
    {
      title: "Skill Name",
      dataIndex: "skillName",
      sorter: (a, b) => a.skillName.localeCompare(b.skillName),
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      sorter: (a, b) => a.percentage - b.percentage,
      render: (val) => (
        <Tag color={val > 70 ? "green" : val > 40 ? "orange" : "red"}>
          {val}%
        </Tag>
      ),
    },
    {
      title: "Comments",
      dataIndex: "comments",
    },

    ...(isSuperAdmin ? [
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

            <DeleteOutlined
              onClick={() => handleDelete(record._id)}
              style={{
                color: "red",
                fontSize: 18,
                cursor: "pointer",
              }}
            />
          </Space>
        ),
      },
    ] : []),
  ];

  return (
    <div style={{ padding: 20 }}>

      {/* ================= TOP CARDS ================= */}

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderLeft: "5px solid #a855f7", height: "100%" }}>
            <h4>Total Skills</h4>
            <h2 style={{ color: "#a855f7", margin: 0 }}>{totalSkills}</h2>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card style={{ borderLeft: "5px solid #7c3aed", height: "100%" }}>
            <h4>Average Skill</h4>
            <h2 style={{ color: "#7c3aed", margin: 0 }}>{avgSkill}%</h2>
          </Card>
        </Col>

        <Col xs={24} sm={24} lg={8}>
          <Card style={{ borderLeft: "5px solid #6d28d9", height: "100%" }}>
            <h4>Strong Skills</h4>
            <h2 style={{ color: "#6d28d9", margin: 0 }}>
              {skills.filter((s) => s.percentage >= 70).length}
            </h2>
          </Card>
        </Col>
      </Row>

      {/* ================= SEARCH + BUTTON ================= */}
      {/* ================= SEARCH + BUTTON ================= */}
      <Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
        <Col xs={24} md={16} lg={18}>
          <Input
            placeholder="Search skill..."
            prefix={<SearchOutlined />}
            value={search}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col xs={24} md={8} lg={6}>
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
            Add Skill
          </Button>
        </Col>
      </Row>



      {/* ================= TABLE ================= */}
      {/* ================= TABLE ================= */}
      <Card bodyStyle={{ padding: 12 }}>
        <div style={{ overflowX: "auto" }}>
          <Table
            loading={isLoading}
            dataSource={filteredSkills}
            columns={columns}
            rowKey="_id"
            pagination={{
              pageSize: 6,
              showSizeChanger: false,
            }}
            scroll={{ x: 700 }}
          />
        </div>
      </Card>

      {/* ================= MODAL ================= */}
      <Modal
        title={editingSkill ? "Update Skill" : "Create Skill"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText={editingSkill ? "Update" : "Create"}
        okButtonProps={{
          style: {
            background: "#a855f7",
            borderColor: "#a855f7",
          },
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            name="skillName"
            label="Skill Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter skill name" />
          </Form.Item>

          <Form.Item
            name="percentage"
            label="Percentage"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              max={100}
              style={{ width: "100%" }}
              placeholder="Enter percentage"
            />
          </Form.Item>

          <Form.Item name="comments" label="Comments">
            <Input.TextArea placeholder="Optional comments" />
          </Form.Item>
        </Form>
      </Modal>
    </div >
  );
};

export default TechnicalSkills;