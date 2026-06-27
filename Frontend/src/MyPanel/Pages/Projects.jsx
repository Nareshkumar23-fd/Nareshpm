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
  Select,
  Upload,
  Popconfirm,
} from "antd";

import {
  UploadOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  useGetAllProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "../../redux/apis/Apis";

const Projects = () => {
  // ================= API =================
  const { data, isLoading } = useGetAllProjectQuery();
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const projects = data?.data || [];


  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isSuperAdmin = user?.role === "superadmin";

  // ================= STATE =================
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [file, setFile] = useState(null);
  const [editFile, setEditFile] = useState(null);

  const [editingProject, setEditingProject] = useState(null);

  // IMAGE MODAL
  const [imageModal, setImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [form] = Form.useForm();

  // ================= FILTER =================
  const filteredData = useMemo(() => {
    return projects
      .filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.type?.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) => (filterType ? item.type === filterType : true));
  }, [projects, search, filterType]);

  // ================= STATS =================
  const totalProjects = projects.length;

  const frontendProjects = projects.filter((p) =>
    p.type?.toLowerCase().includes("frontend")
  ).length;

  const backendProjects = projects.filter((p) =>
    p.type?.toLowerCase().includes("backend")
  ).length;

  // ================= CREATE =================
  const handleCreate = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("type", values.type);
      formData.append("desc", values.desc);
      formData.append("github", values.github);

      formData.append(
        "tech",
        JSON.stringify(values.tech.split(",").map((t) => t.trim()))
      );

      formData.append(
        "points",
        JSON.stringify(values.points.split(",").map((p) => p.trim()))
      );

      formData.append("img", file);

      await createProject(formData).unwrap();

      message.success("Project created");

      setIsCreateOpen(false);
      form.resetFields();
      setFile(null);
    } catch (err) {
      message.error("Create failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await deleteProject(id).unwrap();
      message.success("Deleted successfully");
    } catch (err) {
      message.error("Delete failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (record) => {
    setEditingProject(record);
    setIsEditOpen(true);

    form.setFieldsValue({
      title: record.title,
      type: record.type,
      desc: record.desc,
      tech: record.tech?.join(", "),
      points: record.points?.join(", "),
      github: record.github,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async (values) => {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("type", values.type);
      formData.append("desc", values.desc);
      formData.append("github", values.github);

      formData.append(
        "tech",
        JSON.stringify(values.tech.split(",").map((t) => t.trim()))
      );

      formData.append(
        "points",
        JSON.stringify(values.points.split(",").map((p) => p.trim()))
      );

      if (editFile) {
        formData.append("img", editFile);
      }

      await updateProject({
        id: editingProject._id,
        formData,
      }).unwrap();

      message.success("Updated successfully");

      setIsEditOpen(false);
      setEditingProject(null);
      setEditFile(null);
      setFile(null);

    } catch (err) {
      message.error("Update failed");
    }
  };

  // ================= TABLE =================
  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      render: (img) => (
        <img
          src={img}
          onClick={() => {
            setSelectedImage(img);
            setImageModal(true);
          }}
          style={{
            width: 60,
            height: 40,
            borderRadius: 6,
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => <Tag color="purple">{type}</Tag>,
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
          <Tag color="blue" key={i}>
            {t}
          </Tag>
        )),
    },
    {
      title: "GitHub",
      dataIndex: "github",
      render: (link) => (
        <a href={link} target="_blank" rel="noreferrer">
          View
        </a>
      ),
    },

    ...(isSuperAdmin ? [
      {
        title: "Actions",
        render: (_, record) => (
          <>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              style={{ marginRight: 8 }}
            />

            <Popconfirm
              title="Delete project?"
              onConfirm={() => handleDelete(record._id)}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </>
        ),
      },
    ] : [])
  ];

  return (
    <div style={{ padding: 16 }}>

      {/* ================= ANALYTICS CARDS ================= */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>

        <Col xs={24} md={8}>
          <Card style={{ borderLeft: "5px solid #a855f7" }}>
            <h4>Total Projects</h4>
            <h2>{totalProjects}</h2>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card style={{ borderLeft: "5px solid #7c3aed" }}>
            <h4>Frontend Projects</h4>
            <h2>{frontendProjects}</h2>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card style={{ borderLeft: "5px solid #6d28d9" }}>
            <h4>Backend Projects</h4>
            <h2>{backendProjects}</h2>
          </Card>
        </Col>

      </Row>

      {/* ================= SEARCH ================= */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={10}>
          <Input
            placeholder="Search projects..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col xs={24} md={8}>
          <Select
            allowClear
            placeholder="Filter Type"
            style={{ width: "100%" }}
            onChange={(value) => setFilterType(value)}
          >
            <Select.Option value="Frontend UI">Frontend UI</Select.Option>
            <Select.Option value="Backend">Backend</Select.Option>
            <Select.Option value="Full Stack">Full Stack</Select.Option>
          </Select>
        </Col>

        <Col xs={24} md={6}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateOpen(true)}
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
            Add Project
          </Button>
        </Col>
      </Row>

      {/* ================= TABLE ================= */}
      <Card>
        <Table
          loading={isLoading}
          dataSource={filteredData}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
          scroll={{ x: 900 }}
        />
      </Card>

      {/* ================= IMAGE MODAL ================= */}
      <Modal
        open={imageModal}
        footer={null}
        onCancel={() => setImageModal(false)}
        centered
      >
        <img
          src={selectedImage}
          style={{
            width: "100%",
            borderRadius: 8,
            marginBottom: 12,
          }}
        />

        <Button
          type="primary"
          block
          onClick={() => window.open(selectedImage, "_blank")}
          style={{ background: "#a855f7", borderColor: "#a855f7" }}
        >
          Open in New Tab
        </Button>
      </Modal>

      {/* ================= CREATE MODAL ================= */}
      <Modal
        title="Create Project"
        open={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleCreate}>

          <Form.Item name="title"><Input /></Form.Item>
          <Form.Item name="type"><Input /></Form.Item>
          <Form.Item name="desc"><Input.TextArea /></Form.Item>
          <Form.Item name="tech"><Input /></Form.Item>
          <Form.Item name="points"><Input.TextArea /></Form.Item>
          <Form.Item name="github"><Input /></Form.Item>

          <Form.Item>
            <Upload
              beforeUpload={(file) => {
                setFile(file);
                return false;
              }}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

        </Form>
      </Modal>

      {/* ================= EDIT MODAL ================= */}
      <Modal
        title="Edit Project"
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleUpdate}>

          <Form.Item name="title"><Input /></Form.Item>
          <Form.Item name="type"><Input /></Form.Item>
          <Form.Item name="desc"><Input.TextArea /></Form.Item>
          <Form.Item name="tech"><Input /></Form.Item>
          <Form.Item name="points"><Input.TextArea /></Form.Item>
          <Form.Item name="github"><Input /></Form.Item>

          {/* IMAGE FIELD (NOW FIXED) */}
          <Form.Item label="Project Image">
            <div
              style={{
                marginBottom: 10,
                border: "1px solid #eee",
                padding: 10,
                borderRadius: 8,
              }}
            >
              {editingProject?.img && (
                <img
                  src={editingProject.img}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}
            </div>

            <Upload
              beforeUpload={(file) => {
                setEditFile(file);
                return false;
              }}
              maxCount={1}
            >
              <Button>Select New Image</Button>
            </Upload>
          </Form.Item>

        </Form>
      </Modal>

    </div>
  );
};

export default Projects;